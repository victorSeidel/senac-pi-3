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

async function loadItems() 
{
    try 
    {
        allItems = await fetchData(ITEM_API_URL); // Armazena todos os itens
        renderItems(allItems); // Renderiza os itens na tabela
    } 
    catch (error) 
    {
        console.error('Error loading items:', error);
        alert('An error occurred while loading items. Please check the console for details.');
    }
}

async function loadSales() 
{
    try 
    {
        allSales = await fetchData(SALE_API_URL); // Armazena todas as vendas
        renderSales(allSales); // Renderiza as vendas na tabela
    } 
    catch (error) 
    {
        console.error('Error loading sales:', error);
        alert('An error occurred while loading sales. Please check the console for details.');
    }
}

async function loadWithdrawals() 
{
    try 
    {
        allWithdrawals = await fetchData(WITHDRAWAL_API_URL); // Armazena todos os saques
        renderWithdrawals(allWithdrawals); // Renderiza os saques na tabela
    } 
    catch (error) 
    {
        console.error('Error loading withdrawals:', error);
        alert('An error occurred while loading withdrawals. Please check the console for details.');
    }
}

function renderItems(items) 
{
    const tbody = document.getElementById('items-table-body');
    tbody.innerHTML = items.map(item => `
        <tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.description}</td>
            <td>${item.quantity}</td>
            <td>${item.price}</td>
            <td>${item.available ? 'Yes' : 'No'}</td>
            <td>
                <button class="btn btn-sm btn-warning me-1" onclick="openEditModal(${item.id})">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-sm btn-success me-1" onclick="openSellModal(${item.id})">
                    <i class="bi bi-cash"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteItem(${item.id})">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function renderSales(sales) 
{
    const tbody = document.getElementById('sales-table-body');
    tbody.innerHTML = sales.map(sale => `
        <tr>
            <td>${sale.id}</td>
            <td>${sale.item_id}</td>
            <td>${sale.money.toFixed(2)}</td>
            <td>${new Date(sale.date).toLocaleDateString()}</td>
        </tr>
    `).join('');
}

function renderWithdrawals(withdrawals) 
{
    const tbody = document.getElementById('withdrawals-table-body');
    tbody.innerHTML = withdrawals.map(withdrawal => `
        <tr>
            <td>${withdrawal.id}</td>
            <td>${withdrawal.amount}</td>
            <td>${withdrawal.reason}</td>
            <td>${new Date(withdrawal.date).toLocaleDateString()}</td>
        </tr>
    `).join('');
}
