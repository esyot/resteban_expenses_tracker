<template>
    <div class="flex justify-center items-center min-h-screen bg-yellow-100">
        <div class="container mx-auto p-8 bg-blue rounded-lg shadow-lg border border-gray-300">
            <h1 class="text-5xl text-center text-gray-800 mb-10">Expense Track</h1>
            <div class="flex">
                <div class="flex-1 mr-8 max-w-lg">
                    <input type="text" v-model="newExpense.item" placeholder="Item" class="input-field">
                    <select v-model="newExpense.category" class="input-field">
                        <option value="" disabled selected>Select Category of Expenses</option>
                        <option value="Food">Food</option>
                        <option value="Clothes">Clothes</option>
                        <option value="Transportation">Transportation</option>
                        <option value="Electric Bill">Electric Bill</option>
                        <option value="Water Bill">Water Bill</option>
                    </select>
                    <input type="text" v-model="amountInput" placeholder="Amount" class="input-field">
                    <button @click="addOrUpdateExpense" class="btn-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-database-fill-add" viewBox="0 0 16 16">
                            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0M8 1c-1.573 0-3.022.289-4.096.777C2.875 2.245 2 2.993 2 4s.875 1.755 1.904 2.223C4.978 6.711 6.427 7 8 7s3.022-.289 4.096-.777C13.125 5.755 14 5.007 14 4s-.875-1.755-1.904-2.223C11.022 1.289 9.573 1 8 1"/>
                            <path d="M2 7v-.839c.457.432 1.004.751 1.49.972C4.722 7.693 6.318 8 8 8s3.278-.307 4.51-.867c.486-.22 1.033-.54 1.49-.972V7c0 .424-.155.802-.411 1.133a4.51 4.51 0 0 0-4.815 1.843A12 12 0 0 1 8 10c-1.573 0-3.022-.289-4.096-.777C2.875 8.755 2 8.007 2 7m6.257 3.998L8 11c-1.682 0-3.278-.307-4.51-.867-.486-.22-1.033-.54-1.49-.972V10c0 1.007.875 1.755 1.904 2.223C4.978 12.711 6.427 13 8 13h.027a4.55 4.55 0 0 1 .23-2.002m-.002 3L8 14c-1.682 0-3.278-.307-4.51-.867-.486-.22-1.033-.54-1.49-.972V13c0 1.007.875 1.755 1.904 2.223C4.978 15.711 6.427 16 8 16c.536 0 1.058-.034 1.555-.097a4.5 4.5 0 0 1-1.3-1.905"/>
                        </svg>
                        Add Expense
                    </button>
                </div>
                <div class="flex-1 relative">
                    <div class="expenses-table-container border border-gray-300">
                        <table class="w-full">
                            <thead>
                                <tr>
                                    <th class="border border-gray-300 px-4 py-2">Date & Time</th>
                                    <th class="border border-gray-300 px-4 py-2">Item</th>
                                    <th class="border border-gray-300 px-4 py-2">Category</th>
                                    <th class="border border-gray-300 px-4 py-2">Amount</th>
                                    <th class="border border-gray-300 px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(expense, index) in expenses" :key="index">
                                    <td class="border border-gray-300 px-4 py-2">{{ expense.dateTime }}</td>
                                    <td class="border border-gray-300 px-4 py-2">{{ expense.item }}</td>
                                    <td class="border border-gray-300 px-4 py-2">{{ expense.category }}</td>
                                    <td class="border border-gray-300 px-4 py-2">{{ expense.amount }}</td>
                                    <td class="border border-gray-300 px-4 py-2">
                                        <button @click="editExpense(index)" class="btn-secondary">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                            </svg>
                                            Edit
                                        </button>
                                        <button @click="confirmDelete(expense.id)" class="btn-danger">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                                            </svg>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="total-expenses border-t border-gray-300">Total Expenses: {{ totalExpenses }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .input-field {
        border: 1px solid #ccc;
        padding: 10px;
        border-radius: 5px;
        margin-bottom: 10px;
        width: 100%;
        font-size: 16px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
        transition: box-shadow 0.3s ease;
    }

    .input-field:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    }

    .input-field:focus {
        outline: none;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    }

    .btn-primary {
        background-color: #4a4a4a;
        color: white;
        padding: 12px 24px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 16px;
    }

    .btn-primary:hover {
        background-color: #333;
    }

    .btn-secondary {
        background-color: #ccc;
        color: #333;
        padding: 12px 24px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 16px;
    }

    .btn-secondary:hover {
        background-color: #bbb;
    }

    .btn-danger {
        background-color: #e74c3c;
        color: white;
        padding: 12px 24px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 16px;
    }

    .btn-danger:hover {
        background-color: #c0392b;
    }

    .expenses-table-container {
        max-height: 400px;
        overflow-y: auto;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    }

    .total-expenses {
        position: sticky;
        bottom: 0;
        background-color: white;
        padding: 10px;
        text-align: right;
        font-size: 18px;
    }

    .expenses-table-container table button {
        margin-right: 5px;
    }

    .expenses-table-container table button:last-child {
        margin-right: 0;
    }

    .expenses-table-container table button svg {
        vertical-align: middle;
        margin-right: 5px;
    }
</style>

<script setup>
    import { ref, computed } from 'vue';
    import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';
    import db from './firebase/config';

    const expenses = ref([]);
    const newExpense = ref({
        item: '',
        category: '',
        amount: 0,
    });
    const amountInput = ref('');
    const editingIndex = ref(null);


    const fetchExpenses = async () => {
        const q = query(collection(db, 'expenses'), orderBy('dateTime', 'desc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            expenses.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        });
    };


    import { onMounted } from 'vue';
    onMounted(fetchExpenses);


    const addOrUpdateExpense = async () => {
        if (!newExpense.value.item || !newExpense.value.category || !amountInput.value) {
            alert('Please fill up all the fields.');
            return;
        }

        if (isNaN(parseFloat(amountInput.value))) {
            alert('Please enter a valid number for the amount.');
            return;
        }

        if (editingIndex.value === null) {
            await addExpense();
        } else {
            await updateExpense();
        }
    };


    const addExpense = async () => {
        const dateTime = new Date().toLocaleString();
        const expense = { ...newExpense.value, amount: parseFloat(amountInput.value), dateTime };

        try {
            const docRef = await addDoc(collection(db, 'expenses'), expense);
            console.log('Expense added with ID: ', docRef.id);
        } catch (error) {
            console.error('Error adding expense: ', error);
        }

        newExpense.value = {
            item: '',
            category: '',
            amount: 0,
        };
        amountInput.value = '';
    };


    const updateExpense = async () => {
        const expenseId = expenses.value[editingIndex.value].id;
        const expense = { ...newExpense.value, amount: parseFloat(amountInput.value) };

        try {
            await updateDoc(doc(db, 'expenses', expenseId), expense);
            console.log('Expense updated with ID: ', expenseId);
        } catch (error) {
            console.error('Error updating expense: ', error);
        }

        newExpense.value = {
            item: '',
            category: '',
            amount: 0,
        };
        amountInput.value = '';
        editingIndex.value = null;
    };


    const deleteExpense = async (id) => {
        try {
            await deleteDoc(doc(db, 'expenses', id));
            console.log('Expense deleted with ID: ', id);
        } catch (error) {
            console.error('Error deleting expense: ', error);
        }
    };


    const confirmDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this expense?')) {
            deleteExpense(id);
        }
    };


    const editExpense = (index) => {
        const expense = expenses.value[index];
        newExpense.value = {
            item: expense.item,
            category: expense.category,
            amount: expense.amount,
        };
        amountInput.value = expense.amount;
        editingIndex.value = index;
    };

    const totalExpenses = computed(() => {
        return expenses.value.reduce((total, expense) => total + parseFloat(expense.amount), 0);
    });
</script>
