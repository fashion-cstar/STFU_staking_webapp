import InputBoxContainer from './InputBoxContainer'

interface InputBoxProps {    
    onChange: (val: any) => void
    handleFocus: () => void
    handleBlur: () => void
}

export default function SubmitTextInput({ onChange, handleFocus, handleBlur }: InputBoxProps) {
    return (
        <InputBoxContainer>
            <input               
                type="text"
                className="bg-[#FFFFFF] text-black text-[16px] sm:text-[12px] h-[26px] block w-full p-0 focus:outline-none min-w-[80px]"                
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={(event) => onChange(event.target.value)                
                }                
                required={true}                
            />
        </InputBoxContainer>
    )
}