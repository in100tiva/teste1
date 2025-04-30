// Inicializar o cliente Supabase
// Substitua estas variáveis com suas credenciais do Supabase
const SUPABASE_URL = "https://zqnwarooewrabsxkemtt.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpxbndhcm9vZXdyYWJzeGtlbXR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYwMjkxNDcsImV4cCI6MjA2MTYwNTE0N30.62dffZaQtdL0ssJFnOMo1WXQLgtdETwiDeaePcQW1bY"

// Criar o cliente Supabase
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Função para buscar dados do Supabase
async function fetchInstruments() {
  try {
    // Buscar todos os registros da tabela 'instruments'
    const { data, error } = await supabase.from("instruments").select("*")

    if (error) {
      throw error
    }

    // Exibir os dados na tabela
    displayInstruments(data)
  } catch (error) {
    console.error("Erro ao buscar dados:", error)
    displayError("Não foi possível carregar os dados. Por favor, tente novamente mais tarde.")
  }
}

// Função para exibir os instrumentos na tabela
function displayInstruments(instruments) {
  const tableBody = document.getElementById("table-body")

  // Limpar a tabela
  tableBody.innerHTML = ""

  // Verificar se há dados para exibir
  if (instruments && instruments.length > 0) {
    // Adicionar cada instrumento à tabela
    instruments.forEach((instrument) => {
      const row = document.createElement("tr")

      // Criar célula para o ID
      const idCell = document.createElement("td")
      idCell.textContent = instrument.id
      row.appendChild(idCell)

      // Criar célula para o nome
      const nameCell = document.createElement("td")
      nameCell.textContent = instrument.name
      row.appendChild(nameCell)

      // Adicionar a linha à tabela
      tableBody.appendChild(row)
    })
  } else {
    // Exibir mensagem se não houver dados
    displayError("Nenhum instrumento encontrado.")
  }
}

// Função para exibir mensagens de erro
function displayError(message) {
  const tableBody = document.getElementById("table-body")
  tableBody.innerHTML = `
        <tr class="error-message">
            <td colspan="2">${message}</td>
        </tr>
    `
}

// Carregar os dados quando a página for carregada
document.addEventListener("DOMContentLoaded", fetchInstruments)
