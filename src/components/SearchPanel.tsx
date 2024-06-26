import { ChangeEvent } from 'react'
import { optionType } from '../types/index'
import DropDown from './DropDown'

type Props = {
  term: string
  options: []
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  onOptionSelect: (option: optionType) => void
  onSubmit: () => void
}

const SearchPanel = ({
  term,
  options,
  onInputChange,
  onOptionSelect,
  onSubmit,
}: Props) => (
  <section className="w-full md:max-w-[1000px] p-4 flex flex-col text-center items-center justify-center md:px-10 lg:p-24 h-full lg:h-[100px]
   bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg text-zinc-700">
    <h1 className="text-2xl font-black text-center">Search by City: </h1>
    <div className="relative flex mt-10 md:mt-6">
      <input
        type="text"
        value={term}
        className="w-80 md:w-96 px-2 py-1 rounded-l-md border-2 border-white"
        onChange={onInputChange}
      />

      <DropDown options={options} onSelect={onOptionSelect} />
      
      <button
        className="rounded-r-md border-2 border-zinc-100 hover:border-zinc-500 hover:text-zinc-500  text-zinc-100 px-2 py-1 cursor-pointer"
        onClick={onSubmit}
      >
        Search
      </button>
    </div>
  </section>
)

export default SearchPanel
