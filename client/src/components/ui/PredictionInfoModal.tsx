import React from 'react';
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
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="text-center">
          <DialogTitle>Fonctionnalité de prédiction débloquée !</DialogTitle>
          <DialogDescription>
            Vous verrez maintenant des prédictions de mots au-dessus de la zone de texte. Cliquez sur une prédiction pour l'utiliser et accélérer votre saisie.
          </DialogDescription>
        </DialogHeader>
        <div className="my-4">
          <img src="/src/utils/example_prediction.png" alt="Example of word predictions" className="w-full rounded-md" />
        </div>
        <DialogFooter className="flex justify-center">
          <Button onClick={onClose} size="lg">Compris !</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};