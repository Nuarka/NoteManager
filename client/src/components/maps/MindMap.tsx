import React, { useCallback, Suspense, lazy, useState } from 'react';
import { useStore } from '@/lib/store';

const ReactFlow = lazy(() => import('reactflow').then(m => ({ default: m.default })));
const MiniMap = lazy(() => import('reactflow').then(m => ({ default: m.MiniMap })));
const Controls = lazy(() => import('reactflow').then(m => ({ default: m.Controls })));
const Background = lazy(() => import('reactflow').then(m => ({ default: m.Background })));

import {
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Panel,
} from 'reactflow';

import 'reactflow/dist/style.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2, RotateCcw, Palette } from 'lucide-react';

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: 'Main Project' }, type: 'input', style: { background: 'hsl(217, 89%, 61%)', color: 'white', border: 'none', borderRadius: '8px', padding: '10px', fontWeight: 'bold' } },
];

export function MindMap() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [editName, setEditName] = useState('');
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const addNode = () => {
    const id = crypto.randomUUID();
    const newNode = {
      id,
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label: `New Node ${nodes.length + 1}` },
      style: { 
        background: 'white', 
        border: '1px solid #ddd', 
        borderRadius: '8px', 
        padding: '10px',
        width: 'auto',
        minWidth: '150px',
        maxWidth: '250px',
        wordWrap: 'break-word',
        textAlign: 'center' as const
      }
    };
    setNodes((nds) => nds.concat(newNode));
  };

  const deleteNode = () => {
    if (!selectedNode) return;
    setNodes((nds) => nds.filter((n) => n.id !== selectedNode));
    setEdges((eds) => eds.filter((e) => e.source !== selectedNode && e.target !== selectedNode));
    setSelectedNode(null);
  };

  const renameNode = () => {
    if (!selectedNode || !editName) return;
    const truncatedName = editName.length > 70 ? editName.substring(0, 67) + '...' : editName;
    setNodes((nds) => nds.map((n) => n.id === selectedNode ? { 
      ...n, 
      data: { ...n.data, label: truncatedName },
      style: { ...n.style, height: 'auto' } 
    } : n));
    setEditName('');
  };

  const changeColor = (color: string) => {
    if (!selectedNode) return;
    setNodes((nds) => nds.map((n) => n.id === selectedNode ? { ...n, style: { ...n.style, background: color, color: color === 'white' ? 'black' : 'white' } } : n));
  };

  const resetMap = () => {
    setNodes(initialNodes);
    setEdges([]);
    setSelectedNode(null);
  };

  return (
    <div className="h-[calc(100vh-12rem)] border border-border rounded-xl bg-card shadow-sm overflow-hidden relative">
      <Suspense fallback={<div className="flex items-center justify-center h-full">Loading map...</div>}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={(_, node) => {
            setSelectedNode(node.id);
            setEditName(node.data.label);
          }}
          onPaneClick={() => setSelectedNode(null)}
          fitView
        >
          <Controls />
          <MiniMap />
          <Background gap={12} size={1} />
          
          <Panel position="top-right" className="bg-background/80 backdrop-blur p-2 rounded-lg border shadow-sm flex flex-col gap-2 min-w-[200px]">
            <div className="flex gap-2">
              <Button size="sm" onClick={addNode} className="flex-1"><Plus className="w-4 h-4 mr-1" /> Add</Button>
              <Button size="sm" variant="outline" onClick={resetMap} title="Reset"><RotateCcw className="w-4 h-4" /></Button>
            </div>
            
            {selectedNode && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-1">
                <div className="flex gap-1">
                  <Input 
                    size={1} 
                    value={editName} 
                    onChange={(e) => setEditName(e.target.value)} 
                    placeholder="Node name" 
                    className="h-8 text-xs"
                  />
                  <Button size="sm" onClick={renameNode} className="h-8 px-2">Ok</Button>
                </div>
                <div className="flex gap-1 justify-between">
                  <button onClick={() => changeColor('hsl(217, 89%, 61%)')} className="w-6 h-6 rounded bg-primary" />
                  <button onClick={() => changeColor('hsl(0, 85%, 60%)')} className="w-6 h-6 rounded bg-red-500" />
                  <button onClick={() => changeColor('hsl(146, 70%, 40%)')} className="w-6 h-6 rounded bg-green-500" />
                  <button onClick={() => changeColor('hsl(45, 100%, 51%)')} className="w-6 h-6 rounded bg-yellow-500" />
                  <button onClick={() => changeColor('white')} className="w-6 h-6 rounded border bg-white" />
                  <Button size="sm" variant="destructive" onClick={deleteNode} className="h-6 w-6 p-0"><Trash2 className="w-3 h-3" /></Button>
                </div>
              </div>
            )}
          </Panel>
        </ReactFlow>
      </Suspense>
    </div>
  );
}
