import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from './dialog';
import { Button } from './button';

interface PredictionInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PredictionInfoModal: React.FC<PredictionInfoModalProps> = ({ isOpen, onClose }) => {
  const [imageError, setImageError] = useState(false);
  
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto sm:max-w-md w-[90vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center">
          <DialogTitle className="text-lg font-semibold">Fonctionnalité de prédiction débloquée !</DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            Vous verrez maintenant des prédictions de mots au-dessus de la zone de texte. Cliquez sur une prédiction pour l'utiliser et accélérer votre saisie.
          </DialogDescription>
        </DialogHeader>
        <div className="my-4 flex justify-center">
          {!imageError ? (
            <img 
              src="/example_prediction.png" 
              alt="Example of word predictions" 
              className="w-full max-w-xs rounded-md shadow-sm"
              onError={(e) => {
                console.log('Image failed to load, hiding it');
                setImageError(true);
              }}
            />
          ) : (
            <div className="w-full max-w-xs h-32 bg-gray-100 rounded-md flex items-center justify-center text-gray-500 text-sm">
              <div className="text-center">
                <div className="mb-2">📝</div>
                <div>Exemple de prédictions</div>
              </div>
            </div>
          )}
        </div>
        <DialogFooter className="flex justify-center">
          <Button onClick={onClose} size="lg" className="px-6">Compris !</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};