import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as z from 'zod'
import { MagnifyingGlass } from "phosphor-react";
import { zodResolver } from '@hookform/resolvers/zod'

import { SearchFormContainer } from "./styles";
import { TransactionContext } from "../../contexts/TransactionsContext";

const searchFormSchema = z.object({
  query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

export function SearchForm() {
  const { 
    register, 
    handleSubmit,
    formState: {
      isSubmitting,
    }
   } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema)
  })

  const { fetchTransactions } = useContext(TransactionContext)

  async function handleSearchTransactions(data: SearchFormInputs) {
    await fetchTransactions(data.query)
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input 
        type="text" 
        placeholder="Busque por transações" 
        {...register('query')}
      />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass />
        Buscar
      </button>
    </SearchFormContainer>
  )
}