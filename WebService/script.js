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

async function registerItem(event) 
{
    event.preventDefault();

    const newItem = 
    {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        quantity:  document.getElementById('quantity').value,
        price: document.getElementById('price').value.replace(/,/g, '.'),
        available: parseInt(document.getElementById('quantity').value) > 0
    };

    try 
    {
        await fetchData(ITEM_API_URL, 'POST', newItem);
        alert('Item registered successfully!');
        loadItems(); // Recarrega os itens após cadastrar um novo
        calculateTotalMoney();
    } 
    catch (error) 
    {
        console.error('Error registering item:', error);
        alert('An error occurred while registering the item. Please check the console for details.');
    }
}

async function openEditModal(id) 
{
    try 
    {
        const item = await fetchData(`${ITEM_API_URL}/${id}`);
        document.getElementById('edit-id').value = item.id;
        document.getElementById('edit-name').value = item.name;
        document.getElementById('edit-description').value = item.description;
        document.getElementById('edit-price').value = item.price;
        document.getElementById('edit-quantity').value = item.quantity;

        new bootstrap.Modal(document.getElementById('editItemModal')).show();
    } 
    catch (error) 
    {
        console.error('Error loading item for editing:', error);
        alert('An error occurred while loading the item for editing. Please check the console for details.');
    }
}

async function saveItemEdit(event) 
{
    event.preventDefault();

    const updatedItem = 
    {
        name: document.getElementById('edit-name').value,
        description: document.getElementById('edit-description').value,
        price: parseFloat(document.getElementById('edit-price').value.replace(/,/g, '.')),
        quantity: parseInt(document.getElementById('edit-quantity').value),
        available: parseInt(document.getElementById('edit-quantity').value) > 0,
    };

    try 
    {
        await fetchData(`${ITEM_API_URL}/${document.getElementById('edit-id').value}`, 'PUT', updatedItem);
        alert('Item updated successfully!');
        loadItems(); // Recarrega os itens após editar
        calculateTotalMoney();
        clearFields('edit-item-form');
        bootstrap.Modal.getInstance(document.getElementById('editItemModal')).hide();
    } 
    catch (error) 
    {
        console.error('Error updating item:', error);
        alert('An error occurred while updating the item. Please check the console for details.');
    }
}

async function openSellModal(id) 
{
    try 
    {
        const item = await fetchData(`${ITEM_API_URL}/${id}`);
        document.getElementById('sell-id').value = item.id;
        document.getElementById('sell-name').value = item.name;
        document.getElementById('sell-description').value = item.description;
        document.getElementById('sell-price').value = item.price;
        document.getElementById('sell-total').value = item.quantity;

        new bootstrap.Modal(document.getElementById('sellItemModal')).show();
    } 
    catch (error) 
    {
        console.error('Error loading item for sale:', error);
        alert('An error occurred while loading the item for sale. Please check the console for details.');
    }
}

async function sellItem(event) 
{
    event.preventDefault();

    const itemId = document.getElementById('sell-id').value;
    const quantitySold = parseInt(document.getElementById('sell-quantity').value);

    try 
    {
        const item = await fetchData(`${ITEM_API_URL}/${itemId}`);
        if (item.quantity < quantitySold) 
        {
            alert('Insufficient quantity in stock!');
            return;
        }

        const newQuantity = item.quantity - quantitySold;
        const updatedItem = 
        {
            ...item,
            quantity: newQuantity,
            available: newQuantity > 0,
        };
        await fetchData(`${ITEM_API_URL}/${itemId}`, 'PUT', updatedItem);

        const sale = 
        {
            item_id: itemId,
            quantity: quantitySold,
            money: item.price * quantitySold,
            date: new Date().toISOString(),
        };
        await fetchData(SALE_API_URL, 'POST', sale);

        alert('Item sold successfully!');
        loadItems(); // Recarrega os itens após vender
        loadSales();
        calculateTotalMoney();
        clearFields('sell-item-form');
        bootstrap.Modal.getInstance(document.getElementById('sellItemModal')).hide();
    } 
    catch (error) 
    {
        console.error('Error selling item:', error);
        alert('An error occurred while selling the item. Please check the console for details.');
    }
}

async function makeWithdrawal(event) 
{
    event.preventDefault();

    const withdrawal = 
    {
        amount: document.getElementById('withdraw-amount').value,
        reason: document.getElementById('withdraw-reason').value,
        date: new Date()
    };

    try 
    {
        await fetchData(WITHDRAWAL_API_URL, 'POST', withdrawal);
        alert('Withdrawal made successfully!');
        loadWithdrawals();
        calculateTotalMoney();
        clearFields('withdraw-form'); 
        bootstrap.Modal.getInstance(document.getElementById('withdrawMoneyModal')).hide();
    } 
    catch (error) 
    {
        console.error('Error making withdrawal:', error);
        alert('An error occurred while making the withdrawal. Please check the console for details.');
    }
}

async function deleteItem(id) 
{
    if (confirm('Are you sure you want to delete this item?')) 
    {
        try 
        {
            const response = await fetchData(`${ITEM_API_URL}/${id}`, 'DELETE');
            if (response !== null) 
            {
                console.log('API response:', response);
            }
            alert('Item deleted successfully!');
            loadItems(); // Recarrega os itens após deletar
        } 
        catch (error) 
        {
            console.error('Error deleting item:', error);
            alert('An error occurred while deleting the item. Please check the console for details.');
        }
    }
}