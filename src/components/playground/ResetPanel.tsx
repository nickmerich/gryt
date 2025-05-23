
import React, { useState } from 'react';
import { RotateCcw, History, Save, Copy, ArrowLeft, ArrowRight } from 'lucide-react';
import GhibliCard from '@/components/GhibliCard';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import GhibliButton from '@/components/GhibliButton';
import { toast } from 'sonner';

interface ResetPanelProps {
  mode: 'sandbox' | 'real';
}

interface HistorySnapshot {
  id: string;
  name: string;
  timestamp: string;
  description: string;
  preview: string; // This would be an image URL in a real app
}

const ResetPanel = ({ mode }: ResetPanelProps) => {
  const [snapshots, setSnapshots] = useState<HistorySnapshot[]>([
    {
      id: 'snap1',
      name: 'Initial Setup',
      timestamp: '10:30 AM',
      description: 'Basic goal structure with 5K running plan',
      preview: 'https://i.pravatar.cc/150?img=1', // This would be a real snapshot image in a production app
    },
    {
      id: 'snap2',
      name: 'Added Milestones',
      timestamp: '11:15 AM',
      description: 'Created detailed milestones for each week of training',
      preview: 'https://i.pravatar.cc/150?img=2',
    },
    {
      id: 'snap3',
      name: 'Current Version',
      timestamp: '12:00 PM',
      description: 'Added nutrition plan and recovery tasks',
      preview: 'https://i.pravatar.cc/150?img=3',
    }
  ]);

  const [selectedSnapshot, setSelectedSnapshot] = useState<string>('snap3'); // Current version
  const [snapshotName, setSnapshotName] = useState('');
  const [isCreatingSnapshot, setIsCreatingSnapshot] = useState(false);

  const createSnapshot = () => {
    if (!snapshotName.trim()) {
      toast.error('Please provide a name for your snapshot');
      return;
    }

    setIsCreatingSnapshot(true);

    // Simulate snapshot creation process
    setTimeout(() => {
      const newSnapshot: HistorySnapshot = {
        id: `snap${snapshots.length + 1}`,
        name: snapshotName,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        description: 'Your latest changes and updates',
        preview: `https://i.pravatar.cc/150?img=${snapshots.length + 4}`, // Random image for demo
      };

      setSnapshots([...snapshots, newSnapshot]);
      setSelectedSnapshot(newSnapshot.id);
      setSnapshotName('');
      setIsCreatingSnapshot(false);
      
      toast.success(`Snapshot "${snapshotName}" created successfully!`);
    }, 1500);
  };

  const resetToScratch = () => {
    // In a real app, this would reset the playground state
    toast.success('Playground reset to a clean state!');
    
    // For demo, we'll add a "clean slate" snapshot
    const newSnapshot: HistorySnapshot = {
      id: `snap${snapshots.length + 1}`,
      name: 'Clean Slate',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      description: 'Fresh start with empty playground',
      preview: `https://i.pravatar.cc/150?img=${snapshots.length + 5}`, // Random image for demo
    };
    
    setSnapshots([...snapshots, newSnapshot]);
    setSelectedSnapshot(newSnapshot.id);
  };

  const duplicateSnapshot = (id: string) => {
    const snapshot = snapshots.find(s => s.id === id);
    if (!snapshot) return;
    
    const duplicated: HistorySnapshot = {
      ...snapshot,
      id: `snap${snapshots.length + 1}`,
      name: `Copy of ${snapshot.name}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setSnapshots([...snapshots, duplicated]);
    toast.success(`Duplicated "${snapshot.name}" successfully!`);
  };

  const restoreSnapshot = (id: string) => {
    // In a real app, this would restore the state from the snapshot
    setSelectedSnapshot(id);
    
    const snapshot = snapshots.find(s => s.id === id);
    if (snapshot) {
      toast.success(`Restored to "${snapshot.name}" snapshot`);
    }
  };

  const compareSnapshots = () => {
    // In a real app, this would show a diff view
    toast.info('Comparison view would show here in a real application');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Snapshot History */}
      <div className="space-y-6">
        <GhibliCard>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <History className="w-5 h-5 text-purple-500" />
              Version History
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Track your progress and revert to any previous state if you want to try a different approach.
            </p>
            
            <div className="space-y-3">
              {snapshots.map((snapshot) => (
                <div 
                  key={snapshot.id} 
                  className={`p-3 border rounded-lg cursor-pointer transition-all
                    ${selectedSnapshot === snapshot.id 
                      ? 'border-purple-300 bg-purple-50' 
                      : 'border-gray-200 hover:border-purple-200 hover:bg-purple-50/30'}`}
                  onClick={() => setSelectedSnapshot(snapshot.id)}
                >
                  <div className="flex gap-3">
                    <div className="h-16 w-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                      <img 
                        src={snapshot.preview} 
                        alt={snapshot.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{snapshot.name}</h3>
                        <span className="text-xs text-gray-500">{snapshot.timestamp}</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{snapshot.description}</p>
                      
                      <div className="flex gap-2 mt-2">
                        {selectedSnapshot !== snapshot.id && (
                          <GhibliButton 
                            size="sm" 
                            variant="outline" 
                            className="text-xs h-7 px-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              restoreSnapshot(snapshot.id);
                            }}
                          >
                            Restore
                          </GhibliButton>
                        )}
                        
                        <GhibliButton 
                          size="sm" 
                          variant="ghost" 
                          className="text-xs h-7 px-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            duplicateSnapshot(snapshot.id);
                          }}
                        >
                          <Copy className="w-3 h-3 mr-1" />
                          Duplicate
                        </GhibliButton>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-2">
              <GhibliButton
                variant="outline"
                className="w-full"
                onClick={compareSnapshots}
              >
                Compare Snapshots
              </GhibliButton>
            </div>
          </CardContent>
        </GhibliCard>
      </div>
      
      {/* Snapshot Preview and Actions */}
      <div className="lg:col-span-2 space-y-6">
        <GhibliCard>
          <CardHeader className="pb-2">
            <CardTitle>Snapshot and Iteration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Selected Snapshot Preview */}
            <div className="border rounded-lg overflow-hidden bg-gray-50 h-64 flex items-center justify-center">
              {selectedSnapshot ? (
                <div className="text-center space-y-3">
                  <img 
                    src={snapshots.find(s => s.id === selectedSnapshot)?.preview} 
                    alt="Snapshot preview" 
                    className="h-32 w-32 object-cover rounded-full mx-auto border-4 border-white shadow-lg"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">
                      {snapshots.find(s => s.id === selectedSnapshot)?.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {snapshots.find(s => s.id === selectedSnapshot)?.description}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-gray-400">No snapshot selected</div>
              )}
            </div>
            
            {/* Navigation */}
            <div className="flex justify-between">
              <GhibliButton
                variant="outline" 
                className="gap-2"
                disabled={selectedSnapshot === snapshots[0]?.id}
                onClick={() => {
                  const currentIndex = snapshots.findIndex(s => s.id === selectedSnapshot);
                  if (currentIndex > 0) {
                    setSelectedSnapshot(snapshots[currentIndex - 1].id);
                  }
                }}
              >
                <ArrowLeft className="w-4 h-4" /> 
                Previous Version
              </GhibliButton>
              
              <GhibliButton
                variant="outline" 
                className="gap-2"
                disabled={selectedSnapshot === snapshots[snapshots.length - 1]?.id}
                onClick={() => {
                  const currentIndex = snapshots.findIndex(s => s.id === selectedSnapshot);
                  if (currentIndex < snapshots.length - 1) {
                    setSelectedSnapshot(snapshots[currentIndex + 1].id);
                  }
                }}
              >
                Next Version
                <ArrowRight className="w-4 h-4" /> 
              </GhibliButton>
            </div>
            
            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              {/* Save current state */}
              <div className="border rounded-lg p-4 bg-blue-50/50">
                <h3 className="font-medium flex items-center gap-2 mb-3">
                  <Save className="w-4 h-4 text-blue-600" />
                  Save Current State
                </h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Snapshot name"
                    className="w-full p-2 border rounded"
                    value={snapshotName}
                    onChange={(e) => setSnapshotName(e.target.value)}
                  />
                  <GhibliButton
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={isCreatingSnapshot || !snapshotName.trim()}
                    onClick={createSnapshot}
                  >
                    {isCreatingSnapshot ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                        Creating...
                      </div>
                    ) : (
                      <>Capture Snapshot</>
                    )}
                  </GhibliButton>
                </div>
              </div>
              
              {/* Reset */}
              <div className="border rounded-lg p-4 bg-red-50/50">
                <h3 className="font-medium flex items-center gap-2 mb-3">
                  <RotateCcw className="w-4 h-4 text-red-600" />
                  Reset Playground
                </h3>
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">
                    Clear all your changes and start fresh. This cannot be undone.
                  </p>
                  <GhibliButton
                    className="w-full border-red-300 text-red-600 hover:bg-red-50"
                    variant="outline"
                    onClick={resetToScratch}
                  >
                    Reset to Clean Slate
                  </GhibliButton>
                </div>
              </div>
            </div>
          </CardContent>
        </GhibliCard>
      </div>
    </div>
  );
};

export default ResetPanel;
