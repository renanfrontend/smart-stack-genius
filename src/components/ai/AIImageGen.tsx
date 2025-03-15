
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const AIImageGen = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [style, setStyle] = useState('fotorrealista');
  const [resolution, setResolution] = useState('1024x1024');
  const [creativity, setCreativity] = useState([0.7]);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  
  const handleGenerateImage = async () => {
    if (!prompt.trim()) {
      toast.error('Por favor, descreva a imagem que você deseja gerar.');
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulando geração de imagem
      setTimeout(() => {
        const placeholderImage = 'https://source.unsplash.com/random/1024x1024/?art';
        setGeneratedImage(placeholderImage);
        setLoading(false);
        toast.success('Imagem gerada com sucesso!');
      }, 3000);
    } catch (error) {
      toast.error('Erro ao gerar imagem. Tente novamente.');
      setLoading(false);
    }
  };
  
  return (
    <div className="p-6 flex flex-col gap-8 h-full">
      <div className="max-w-3xl mx-auto w-full space-y-4">
        <h2 className="text-2xl font-semibold mb-4">Criação de Imagens</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Descreva em detalhes a imagem que você deseja criar e ajuste os parâmetros conforme necessário.
        </p>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="prompt">Descrição da imagem</Label>
            <Textarea 
              id="prompt"
              placeholder="Descreva a imagem que você deseja criar..."
              className="min-h-24"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="style">Estilo</Label>
              <Select value={style} onValueChange={setStyle}>
                <SelectTrigger id="style">
                  <SelectValue placeholder="Selecione um estilo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fotorrealista">Fotorrealista</SelectItem>
                  <SelectItem value="arte-digital">Arte Digital</SelectItem>
                  <SelectItem value="pixel-art">Pixel Art</SelectItem>
                  <SelectItem value="abstrato">Abstrato</SelectItem>
                  <SelectItem value="anime">Anime</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="resolution">Resolução</Label>
              <Select value={resolution} onValueChange={setResolution}>
                <SelectTrigger id="resolution">
                  <SelectValue placeholder="Selecione uma resolução" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1024x1024">1024x1024 (Quadrada)</SelectItem>
                  <SelectItem value="1024x768">1024x768 (Paisagem)</SelectItem>
                  <SelectItem value="768x1024">768x1024 (Retrato)</SelectItem>
                  <SelectItem value="1792x1024">1792x1024 (Panorâmica)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <Label htmlFor="creativity">Criatividade: {creativity[0]}</Label>
            </div>
            <Slider 
              id="creativity"
              min={0.1} 
              max={1.0} 
              step={0.1} 
              value={creativity} 
              onValueChange={setCreativity} 
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Preciso</span>
              <span>Criativo</span>
            </div>
          </div>
          
          <Button 
            onClick={handleGenerateImage} 
            disabled={loading || !prompt.trim()}
            className="w-full"
          >
            {loading ? 'Gerando imagem...' : 'Gerar Imagem'}
          </Button>
        </div>
      </div>
      
      {generatedImage && (
        <div className="max-w-3xl mx-auto w-full mt-6">
          <div className="rounded-lg overflow-hidden bg-black/20 p-2">
            <img 
              src={generatedImage} 
              alt="Imagem gerada" 
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="flex justify-between mt-4">
            <Button variant="outline" onClick={() => setGeneratedImage(null)}>
              Nova Imagem
            </Button>
            <Button variant="secondary" onClick={() => window.open(generatedImage, '_blank')}>
              Baixar Imagem
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIImageGen;
