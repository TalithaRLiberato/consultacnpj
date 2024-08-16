//bloco de importações do código 
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import './style.css';
import api from "./services/api"

//Função cria duas variáveis com diferentes comportamentos
function App() {

  const [input, setInput] = useState('');
  const [cnpj, setCNPJ] = useState({});

  async function handleSearch(){
    
    //funcionam juntos
    if(input === ''){
      alert("Preencha algum CNPJ!")
      return;
    }

    try{
      const response = await api.get(`${input}`)
      setCNPJ(response.data)
      setInput("")
    }catch{
      alert("Erro ao buscar CNPJ!")
      setInput("")
    }
  }
  
  //retorna a requisição, voltando a página em react
  return (
    <div className="container">
      <h1 className="title">Consultar CNPJ</h1>

      <div className="containerInput">
        <input
        type="text"
        placeholder="Digite o CNPJ..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        />

      <button className="buttonSearch" onClick={handleSearch}>
        <FiSearch size={25} color="#FFF"/>
       </button>
      </div>

      {Object.keys(cnpj ).length > 0 && (
        <main className="main">
          <h2>Razão Social: {cnpj.razao_social}</h2>
          <span>Fundação: {cnpj.data_inicio_atividade}</span>
          <span>Situação Cadastral:{cnpj.descricao_situacao_cadastral}</span>
          <span>Contato: {cnpj.ddd_fax}</span>
        </main>
      )}
        
      </div>
  );
}

//Exporta a aplicação, torna a aplicação app pública
export default App;