import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Lottie from 'lottie-react';
import {v4 as uuid} from 'uuid';
import iconPlay from '../../assets/svg/icon-play.svg';
import iconNewWindow from '../../assets/svg/icon-new-window.svg';
import {DefinitionContext} from '../../context/Definition';
import {DictionaryContextType} from '../../interfaces';
import {ValidationContext, ValidationContextType} from '../../context/Validation';
import notFound from '../../assets/lottie/not-found.json';
import { playAudioFile, pluralize } from '../../util';

export default function DefinitionList() {
  const {definition} = React.useContext(DefinitionContext) as DictionaryContextType;
  const {validation} = React.useContext(ValidationContext) as ValidationContextType;
  const [audioUrl, setAudioUrl] = React.useState<string>('');

  React.useEffect(() => {
    if (!definition) return;

    for (let i = 0; i < definition.phonetics.length; i++) {
      if (definition.phonetics[i].audio) {
        setAudioUrl(definition.phonetics[i].audio);
        break;
      }
    }
  }, [definition]);

  if (!validation.validated) {
    return validation.message?.title ? (
      <div className="container mt-20 flex max-w-full flex-col items-center gap-y-5 pb-[5.25rem] text-center dark:bg-[#050505] dark:text-white">
        <div className="flex flex-col items-center justify-center">
          <Lottie animationData={notFound} loop={false} style={{width: 200, height: 200}} />
        </div>
        {validation.message.title !== 'empty' ? <h1 className="text-[1.25rem] font-bold">{validation.message?.title}</h1> : null}
        <p className="max-w-prose text-[1.125rem] leading-[1.33] dark:text-[#757575]">
          {validation.message?.message} {validation.message?.resolution}
        </p>
      </div>
    ) : null;
  }

  return (
    <div className="container max-w-full pb-[5.25rem] dark:bg-[#050505] dark:text-white">
      {definition ? (
        <div className="flex flex-col">
          <div className="mb-8 flex justify-between md:mb-10">
            <div className="flex flex-col justify-between gap-y-2 md:gap-y-4">
              <h1 className="leading:[1.2] text-[2rem] font-bold md:text-[4rem] md:leading-[1]">
                {definition.word}
              </h1>
              <span className="text-[1.5rem] leading-[1] text-[#A445ED]">
                {definition.phonetic}
              </span>
            </div>
            <button type="button" onClick={() => playAudioFile(audioUrl)}>
              <div className="h-12 w-12 pt-2 md:h-[4.75rem] md:w-[4.75rem]">
                <Image src={iconPlay} alt="" />
              </div>
            </button>
          </div>
          {definition.meanings.map(meaning => (
            <div key={uuid()} className="flex flex-col">
              <div className="mb-4 flex items-center gap-x-4 md:mb-10">
                <h2 className="text-[1.125rem] font-bold italic md:text-[1.5rem]">
                  {meaning.partOfSpeech}
                </h2>
                <div className="h-[1px] basis-full bg-[#E9E9E9] dark:bg-[#3A3A3A]" />
              </div>
              <h3 className="font-regular text-{1rem] mb-6 text-[#757575] md:mb-4 md:text-[1.25rem]">
                Meaning
              </h3>
              <ul className="mb-5 flex flex-col gap-y-[0.875rem] md:mb-7">
                {meaning.definitions.map(item => (
                  <li key={uuid()} className="grid grid-cols-[auto_1fr]">
                    <div className="col-span-1 col-start-1 mr-5 mt-[0.625rem] max-h-[6.25px] min-h-[6.25px] min-w-[6.25px] max-w-[6.25px] rounded-full bg-[#8F19E8]" />
                    <span className="col-start-2 text-[0.9375rem] leading-[1.6] md:text-[1.125rem] md:leading-[1.33]">
                      {item.definition}
                    </span>
                    {item?.example
                      ? item.example.split('\u2003').map(example => (
                          <span
                            key={uuid()}
                            className="col-start-2 mt-3 text-[0.9375rem] leading-[1.6] dark:text-[#757575] md:text-[1.125rem] md:leading-[1.33]"
                          >
                            {example}
                          </span>
                        ))
                      : null}
                  </li>
                ))}
              </ul>
              <div className="mb-8 md:mb-10">
                {meaning.synonyms.length > 0 ? (
                  <div className="flex">
                    <h3 className="font-regular mr-5 text-[1rem] text-[#757575] md:text-[1.25rem]">
                      Synonyms
                    </h3>
                    <div className="text-[1rem] font-bold text-[#A445ED] md:text-[1.25rem]">
                      {meaning.synonyms.map(item => (
                        <span key={uuid()} className="mr-2">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
                {meaning.antonyms.length > 0 ? (
                  <div className="flex">
                    <h3 className="font-regular mr-5 text-[1rem] text-[#757575] md:text-[1.25rem]">
                      Antonyms
                    </h3>
                    <div>
                      {meaning.antonyms.map(item => (
                        <span key={uuid()} className="mr-2">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          ))}
          <div className="mb-5 h-[1px] bg-[#E9E9E9] dark:bg-[#3A3A3A]" />
          {definition.sourceUrls.length > 0 ? (
            <div className="font-regular gap-x-5 text-[0.875rem] md:flex">
              <h2 className="mb-[0.125rem] text-[#757575] underline">
                {pluralize('Source', 's', definition.sourceUrls.length > 1)}
              </h2>
              {definition.sourceUrls.map(item => (
                <Link
                  key={uuid()}
                  href={item}
                  className="flex w-fit items-center gap-x-3 text-[#2D2D2D] underline dark:text-white"
                >
                  <span>{item}</span>
                  <Image
                    src={iconNewWindow}
                    width={12}
                    height={12}
                    alt=""
                    className="-mt-[0.1rem]"
                  />
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
