import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import QuemSomos from "./pages/QuemSomos";
import AreasAtuacao from "./pages/AreasAtuacao";
import IAJuridica from "./pages/IAJuridica";
import Consulta from "./pages/Consulta";
import Artigos from "./pages/Artigos";
import ArtigoDetalhes from "./pages/ArtigoDetalhes";
import GerarArtigo from "./pages/GerarArtigo";
import Contato from "./pages/Contato";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import RecuperarSenha from "./pages/RecuperarSenha";
import RedefinirSenha from "./pages/RedefinirSenha";
import Perfil from "./pages/Perfil";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import TermosUso from "./pages/TermosUso";
import PoliticaPrivacidade from "./pages/PoliticaPrivacidade";
import CodigoEticaOAB from "./pages/CodigoEticaOAB";
import LGPD from "./pages/LGPD";
import CalculadoraRescisao from "./pages/CalculadoraRescisao";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/quem-somos" element={<QuemSomos />} />
          <Route path="/areas-atuacao" element={<AreasAtuacao />} />
          <Route path="/ia-juridica" element={<IAJuridica />} />
          <Route path="/consulta" element={<Consulta />} />
          <Route path="/artigos" element={<Artigos />} />
          <Route path="/artigos/:id" element={<ArtigoDetalhes />} />
          <Route path="/gerar-artigo" element={<GerarArtigo />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/recuperar-senha" element={<RecuperarSenha />} />
          <Route path="/redefinir-senha" element={<RedefinirSenha />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/termos" element={<TermosUso />} />
          <Route path="/privacidade" element={<PoliticaPrivacidade />} />
          <Route path="/codigo-etica-oab" element={<CodigoEticaOAB />} />
          <Route path="/lgpd" element={<LGPD />} />
          <Route path="/calculadora-rescisao" element={<CalculadoraRescisao />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
