import Transaction from '../models/Transaction'

interface Balance {
  income: number
  outcome: number
  total: number
}

interface TransactionDTO {
  title: string
  value: number
  type: 'income' | 'outcome'
}

class TransactionsRepository {
  private transactions: Transaction[]

  constructor() {
    this.transactions = []
  }

  public all(): Transaction[] {
    return this.transactions
  }

  public getBalance(): Balance {
    const balance: Balance = this.transactions.reduce(
      (prevValue: Balance, transaction) => {
        const { value } = transaction
        const newValue = prevValue

        if (transaction.type === 'income') {
          newValue.income += value
          newValue.total += value
        }

        if (transaction.type === 'outcome') {
          newValue.outcome += value
          newValue.total -= value
        }

        return newValue
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    )

    return balance
  }

  public create({ title, type, value }: TransactionDTO): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    })

    this.transactions.push(transaction)

    return transaction
  }
}

export default TransactionsRepository
