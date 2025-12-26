import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { Button } from '@/components/ui/button';
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Quote, 
  Undo, 
  Redo, 
  Link as LinkIcon, 
  Image as ImageIcon,
  Save,
  Check
} from 'lucide-react';
import { useCallback, useMemo, useState, useEffect } from 'react';

interface EditorProps {
  content: string;
  onChange: (content: string) => void;
  editable?: boolean;
}

export function Editor({ content, onChange, editable = true }: EditorProps) {
  const [isSaved, setIsSaved] = useState(false);

  const extensions = useMemo(() => [
    StarterKit,
    Image,
    Link.configure({
      openOnClick: false,
    }),
  ], []);

  const editor = useEditor({
    extensions,
    content,
    editable,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
      setIsSaved(false);
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none max-w-none min-h-[500px] p-8 bg-card rounded-b-xl [&_img]:rounded-2xl [&_img]:shadow-xl [&_img]:border-4 [&_img]:border-white/10 [&_img]:cursor-nwse-resize [&_img.resizing]:border-primary [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:bg-primary/5 [&_blockquote]:p-6 [&_blockquote]:rounded-r-2xl [&_blockquote]:italic [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_a]:text-primary [&_a]:underline [&_a]:font-bold',
      },
    },
  });

  // Auto-save simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isSaved) {
        setIsSaved(true);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [content]);

  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('Введите URL / Enter URL', previousUrl);

    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const addImage = useCallback(() => {
    if (!editor) return;
    const choice = window.confirm('Загрузить с устройства (ОК) или по ссылке (Отмена)?\nUpload from device (OK) or via URL (Cancel)?');
    
    if (choice) {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            editor.chain().focus().setImage({ src: reader.result as string }).run();
          };
          reader.readAsDataURL(file);
        }
      };
      input.click();
    } else {
      const url = window.prompt('Введите URL изображения / Enter image URL');
      if (url) {
        editor.chain().focus().setImage({ src: url }).run();
      }
    }
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="border border-border rounded-xl bg-card shadow-lg flex flex-col h-full overflow-hidden">
      {editable && (
        <div className="border-b border-border bg-background p-2 flex flex-wrap items-center gap-1 sticky top-0 z-10">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'bg-primary/10 text-primary' : ''}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'bg-primary/10 text-primary' : ''}
          >
            <Italic className="h-4 w-4" />
          </Button>
          <div className="w-px h-6 bg-border mx-1" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'bg-primary/10 text-primary' : ''}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive('orderedList') ? 'bg-primary/10 text-primary' : ''}
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
          <div className="w-px h-6 bg-border mx-1" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive('blockquote') ? 'bg-primary/10 text-primary' : ''}
          >
            <Quote className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={setLink} className={editor.isActive('link') ? 'bg-primary/10 text-primary' : ''}>
            <LinkIcon className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={addImage}>
            <ImageIcon className="h-4 w-4" />
          </Button>
          <div className="flex-1" />
          <div className="flex items-center gap-2 text-xs text-muted-foreground mr-4">
            {isSaved ? <span className="flex items-center gap-1"><Check className="w-3 h-3 text-green-500" /> Saved</span> : 'Saving...'}
          </div>
          <Button variant="outline" size="sm" onClick={() => setIsSaved(true)} className="gap-2 h-8">
            <Save className="h-3 w-3" /> Save
          </Button>
          <div className="flex gap-1 ml-1">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => editor.chain().focus().undo().run()}><Undo className="h-4 w-4" /></Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => editor.chain().focus().redo().run()}><Redo className="h-4 w-4" /></Button>
          </div>
        </div>
      )}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
         <EditorContent editor={editor} />
      </div>
    </div>
  );
}
