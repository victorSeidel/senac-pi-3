const ITEM_API_URL = 'http://localhost:8080/api/items';
const SALE_API_URL = 'http://localhost:8080/api/sales';
const WITHDRAWAL_API_URL = 'http://localhost:8080/api/withdraws';

let allItems = []; // Variável global para armazenar todos os itens carregados

async function fetchData(url, method = 'GET', body = null) 
{
    const options = 
    {
        method,
        headers: { 'Content-Type': 'application/json' },
    };
    if (body) options.body = JSON.stringify(body);

    try 
    {
        const response = await fetch(url, options);

        if (!response.ok) 
        {
            throw new Error(`Request error: ${response.statusText}`);
        }

        if (response.status === 204) 
        {
            return null;
        }

        return await response.json();
    } 
    catch (error) 
    {
        console.error('Error parsing response as JSON:', error);
        alert('An error occurred while fetching data. Please check the console for details.');
        return null;
    }
}

document.addEventListener('DOMContentLoaded', () => 
    {
        loadItems();
        loadSales();
        loadWithdrawals();
        calculateTotalMoney();
    
        document.getElementById('register-form').addEventListener('submit', registerItem);
        document.getElementById('edit-item-form').addEventListener('submit', saveItemEdit);
        document.getElementById('sell-item-form').addEventListener('submit', sellItem);
        document.getElementById('withdraw-form').addEventListener('submit', makeWithdrawal);
        document.querySelector('.btn-withdraw').addEventListener('click', generatePDFReport);
    
        // Adiciona os eventos de busca para cada tabela
        document.getElementById('search-items').addEventListener('input', searchItems);
        document.getElementById('search-sales').addEventListener('input', searchSales);
        document.getElementById('search-withdrawals').addEventListener('input', searchWithdrawals);
    
        document.getElementById('register-form').addEventListener('submit', function () 
        {
            const form = document.getElementById('register-form');
            if (form) 
            {
                form.reset();
            }
        });
    
        document.getElementById('editItemModal').addEventListener('show.bs.modal', function () 
        {
            document.getElementById("quant-sell-input").value = "";
        });
    
        document.getElementById('withdrawMoneyModal').addEventListener('show.bs.modal', function () 
        {
            document.getElementById("amount-input").value = "";
            document.getElementById("reason-input").value = "";
        });
    });