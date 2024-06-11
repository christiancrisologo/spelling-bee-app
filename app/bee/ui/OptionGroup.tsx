"use client"

import cls from "classnames";
import { useState } from "react";

export type OptionProps = {
    label: string
    selected?: boolean
}

type OptionGroupProps = {
    options: OptionProps[]
    onChange: (value: string) => void
    selected: string
    label: string
}


const OptionGroup = (props: OptionGroupProps) => {
    const { options, onChange, selected, label } = props;
    const [optionSelected, setOptionSelected] = useState(selected);


    return (<div className="flex-col  my-2" >
        <label className="flex ms-2 self-center text-blue-900 font-medium">{label}</label>
        <div className="inline-flex  mt-2" role="group">
            {options.map((option, index)=> {
                const { label } = option;
                const className = cls(
                    "px-4 py-2 text-sm font-medium text-gray-900 bg-slate-100 border border-blue-500 hover:bg-blue-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-blue-500 focus:bg-blue-900 focus:text-white active:bg-blue-800",
                    {
                        'rounded-s-lg': index === 0,
                        'rounded-e-lg': index  >= options.length-1,
                        'bg-blue-800': optionSelected === label,
                        'text-white': optionSelected === label
                    });

                return (<button
                        key={index}
                        type="button"
                        className={className}
                        onClick={() => {
                            setOptionSelected(label)
                            onChange(label)
                        }}
                    >
                    {label}
                </button>)
            })}
        </div>
    </div>)
};

export default OptionGroup;