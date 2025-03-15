
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';

const AITextGen = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('article');
  const [length, setLength] = useState('medium');
  const [creativity, setCreativity] = useState([0.7]);
  const [generatedText, setGeneratedText] = useState<string | null>(null);
  
  const handleGenerateText = async () => {
    if (!prompt.trim()) {
      toast.error('Por favor, descreva o texto que você deseja gerar.');
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulando geração de texto
      setTimeout(() => {
        const placeholder = `# ${prompt}\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet ultricies ultricies, nisl nisl tincidunt nisl, eget ultricies nisl nisl sit amet nunc. Sed euismod, nunc sit amet ultricies ultricies, nisl nisl tincidunt nisl, eget ultricies nisl nisl sit amet nunc.\n\n## Seção 1\n\nNullam eget ultricies nisl nisl sit amet nunc. Sed euismod, nunc sit amet ultricies ultricies, nisl nisl tincidunt nisl, eget ultricies nisl nisl sit amet nunc. Sed euismod, nunc sit amet ultricies ultricies, nisl nisl tincidunt nisl, eget ultricies nisl nisl sit amet nunc.\n\n## Seção 2\n\nPellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.`;
        
        setGeneratedText(placeholder);
        setLoading(false);
        toast.success('Texto gerado com sucesso!');
      }, 3000);
    } catch (error) {
      toast.error('Erro ao gerar texto. Tente novamente.');
      setLoading(false);
    }
  };
  
  return (
    <div className="p-6 flex flex-col gap-8 h-full">
      <div className="max-w-3xl mx-auto w-full space-y-4">
        <h2 className="text-2xl font-semibold mb-4">Criação de Textos</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Descreva o tipo de texto que você deseja criar e ajuste os parâmetros para personalizar o resultado.
        </p>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="prompt">Descrição do texto</Label>
            <Textarea 
              id="prompt"
              placeholder="Descreva o texto que você deseja criar..."
              className="min-h-24"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="type">Tipo de texto</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Selecione um tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="article">Artigo</SelectItem>
                  <SelectItem value="essay">Redação</SelectItem>
                  <SelectItem value="blog">Postagem de blog</SelectItem>
                  <SelectItem value="story">História</SelectItem>
                  <SelectItem value="email">E-mail</SelectItem>
                  <SelectItem value="resume">Currículo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="length">Comprimento</Label>
              <Select value={length} onValueChange={setLength}>
                <SelectTrigger id="length">
                  <SelectValue placeholder="Selecione o comprimento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">Curto (~ 150 palavras)</SelectItem>
                  <SelectItem value="medium">Médio (~ 300 palavras)</SelectItem>
                  <SelectItem value="long">Longo (~ 600 palavras)</SelectItem>
                  <SelectItem value="xl">Extra longo (~ 1000+ palavras)</SelectItem>
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
              <span>Factual</span>
              <span>Criativo</span>
            </div>
          </div>
          
          <Button 
            onClick={handleGenerateText} 
            disabled={loading || !prompt.trim()}
            className="w-full"
          >
            {loading ? 'Gerando texto...' : 'Gerar Texto'}
          </Button>
        </div>
      </div>
      
      {generatedText && (
        <div className="max-w-3xl mx-auto w-full mt-6">
          <div className="rounded-lg overflow-hidden bg-black/20 p-4">
            <div className="prose prose-invert max-w-none">
              {generatedText.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <Button variant="outline" onClick={() => setGeneratedText(null)}>
              Novo Texto
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => {
                navigator.clipboard.writeText(generatedText);
                toast.success('Texto copiado para a área de transferência');
              }}
            >
              Copiar Texto
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AITextGen;
