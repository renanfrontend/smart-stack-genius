
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';

const AIMusicGen = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [genre, setGenre] = useState('ambient');
  const [duration, setDuration] = useState('60');
  const [variation, setVariation] = useState([0.5]);
  const [generatedMusic, setGeneratedMusic] = useState<string | null>(null);
  
  const handleGenerateMusic = async () => {
    if (!prompt.trim()) {
      toast.error('Por favor, descreva a música que você deseja criar.');
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulando geração de música (na implementação real, chamaremos uma API)
      setTimeout(() => {
        // URL de exemplo - na implementação real, isso seria o resultado da API
        const sampleAudio = 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_f01c3670e4.mp3';
        setGeneratedMusic(sampleAudio);
        setLoading(false);
        toast.success('Música gerada com sucesso!');
      }, 3000);
    } catch (error) {
      toast.error('Erro ao gerar música. Tente novamente.');
      setLoading(false);
    }
  };
  
  return (
    <div className="p-6 flex flex-col gap-8 h-full">
      <div className="max-w-3xl mx-auto w-full space-y-4">
        <h2 className="text-2xl font-semibold mb-4">Criação de Músicas</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Descreva a música que você deseja criar e ajuste os parâmetros para personalizar o resultado.
        </p>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="prompt">Descrição da música</Label>
            <Textarea 
              id="prompt"
              placeholder="Descreva a música que você deseja criar..."
              className="min-h-24"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="genre">Gênero</Label>
              <Select value={genre} onValueChange={setGenre}>
                <SelectTrigger id="genre">
                  <SelectValue placeholder="Selecione um gênero" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ambient">Ambiente</SelectItem>
                  <SelectItem value="electronic">Eletrônica</SelectItem>
                  <SelectItem value="classical">Clássica</SelectItem>
                  <SelectItem value="rock">Rock</SelectItem>
                  <SelectItem value="jazz">Jazz</SelectItem>
                  <SelectItem value="pop">Pop</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="duration">Duração (segundos)</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger id="duration">
                  <SelectValue placeholder="Selecione a duração" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 segundos</SelectItem>
                  <SelectItem value="60">1 minuto</SelectItem>
                  <SelectItem value="120">2 minutos</SelectItem>
                  <SelectItem value="180">3 minutos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <Label htmlFor="variation">Variação: {variation[0]}</Label>
            </div>
            <Slider 
              id="variation"
              min={0.1} 
              max={1.0} 
              step={0.1} 
              value={variation} 
              onValueChange={setVariation} 
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Simples</span>
              <span>Complexa</span>
            </div>
          </div>
          
          <Button 
            onClick={handleGenerateMusic} 
            disabled={loading || !prompt.trim()}
            className="w-full"
          >
            {loading ? 'Gerando música...' : 'Gerar Música'}
          </Button>
        </div>
      </div>
      
      {generatedMusic && (
        <div className="max-w-3xl mx-auto w-full mt-6">
          <div className="rounded-lg overflow-hidden bg-black/20 p-4">
            <audio 
              controls 
              className="w-full" 
              src={generatedMusic}
            >
              Seu navegador não suporta o elemento de áudio.
            </audio>
          </div>
          <div className="flex justify-between mt-4">
            <Button variant="outline" onClick={() => setGeneratedMusic(null)}>
              Nova Música
            </Button>
            <Button variant="secondary" onClick={() => window.open(generatedMusic || '', '_blank')}>
              Baixar Música
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIMusicGen;
