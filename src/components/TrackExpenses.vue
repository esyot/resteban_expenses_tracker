<template>
 
            <div class="flex p-2">
                <div class="flex-1 mr-8 max-w-lg">
                    <input type="text" v-model="newExpense.item" placeholder="Item" class="input-field">
                    <select v-model="newExpense.category" class="input-field">
                        <option value="" disabled selected>Select Category of Expenses</option>
                        <option value="Food">Food</option>
                        <option value="Clothes">Clothes</option>
                        <option value="Transportation">Transportation</option>
                        <option value="Electric Bill">Electric Bill</option>
                        <option value="Water Bill">Water Bill</option>
                        <option value="Water Bill">Others</option>
                    </select>
                    <input type="text" v-model="amountInput" placeholder="Amount" class="input-field">
                    
                    <div class="flex justify-end">
                        <button @click="addOrUpdateExpense" class="btn-primary">
                        
                            Add Expense
                        </button>
                    </div>
                </div>
                <div class="flex-1 relative">
                    <div class="expenses-table-container border border-gray-300">
                        <table class="w-full">
                            <thead>
                                <tr class="bg-blue-200">
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
                                           <i class="fas fa-pencil"></i>
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
                    <div class="bg-blue-300 p-2 justify-between border-t border-gray-300 mt-2 rounded flex">
                        <h1>Total Expenses:</h1><span> {{ totalExpenses }}</span>
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
    import db from '../firebase/config';

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
