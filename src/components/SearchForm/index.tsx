import React from 'react';
import Image from 'next/image';
import Lottie from 'lottie-react';
import {DictionaryAPIData, DictionaryContextType} from '../../interfaces';
import {DefinitionContext} from '../../context/Definition';
import {ValidationContext, ValidationContextType} from '../../context/Validation';
import iconSearch from '../../assets/svg/icon-search.svg';
import book from '../../assets/lottie/book.json';

export default function SearchForm() {
  const {validation, setValidation} = React.useContext(ValidationContext) as ValidationContextType;
  const {setDefinition} = React.useContext(DefinitionContext) as DictionaryContextType;
  const [word, setWord] = React.useState('');
  const [init, setInit] = React.useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setInit(true);

    if (word.replaceAll(/\s/g, '') === '') {
      setValidation({
        validated: false,
        message: {
          title: 'empty',
          message: 'Please enter a word to begin searching',
        },
      });
    } else {
      try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();
        if (!response.ok) {
          setValidation({validated: false, message: data});
        } else {
          setValidation({validated: true});
          setDefinition(data[0] as DictionaryAPIData);
        }
      } catch {
        setValidation({
          validated: false,
          message: {
            title: 'No definition found',
            message: "Sorry pal, we couldn't find definitions for the word you were looking for.",
            resolution: 'You can try the search again at later time or head to the web instead.',
          },
        });
      }
    }
  }

  return (
    <div className="container max-w-full pb-[1.125rem] text-[1rem] dark:bg-[#050505] dark:text-white md:pb-8 md:text-[1.25rem]">
      <form role="search" className="relative w-full" onSubmit={handleSubmit}>
        <label
          id="search-form-label"
          htmlFor="search-form-input"
          className="absolute -m-[1px] h-[1px] w-[1px] overflow-hidden whitespace-nowrap border-0 p-0"
        >
          Search dictionary
        </label>
        <div
          className={`relative flex w-[inherit] justify-between gap-x-10 rounded-2xl bg-[#F4F4F4] dark:bg-[#1F1F1F] ${!validation.validated && validation.message?.message ? 'focus-within:shadow-[0_0_0_1px_rgba(255,82,82,1)]' : 'focus-within:shadow-[0_0_0_1px_rgba(164,69,237,1)]'}`}
        >
          <input
            id="search-form-input"
            aria-labelledby="search-form-label"
            type="search"
            placeholder="Search Dictionary"
            value={word}
            onChange={e => setWord(e.target.value)}
            className="w-fit basis-full rounded-2xl bg-[#F4F4F4] px-6 py-[0.875rem] caret-[#A445ED] focus-within:outline-none dark:bg-[#1F1F1F] md:py-5"
          />
          <button type="submit" className="px-6 py-[0.875rem] md:py-5">
            <Image src={iconSearch} alt="" />
          </button>
        </div>
      </form>
      {!validation.validated && validation.message?.title === 'empty' ? (
        <p className="mt-4 text-[1.25rem] leading-[1.2] text-[#FF5252]">Whoops, can&apos;t be empty</p>
      ) : null}
      {!init ? (
        <div className="mt-32 flex flex-col items-center justify-center">
          <Lottie animationData={book} loop={false} style={{width: 200, height: 200}} />
          <h1 className="-mt-8">
            Get definitions and audio pronunciations of words from the free Dictionary API.
          </h1>
        </div>
      ) : null}
    </div>
  );
}
