import InputBoxContainer from './InputBoxContainer'

interface InputBoxProps {    
    id: string
    onChange: (val: any) => void
    handleFocus: () => void
    handleBlur: () => void
}

export default function StakingInputBox({ id, onChange, handleFocus, handleBlur }: InputBoxProps) {
    return (
        <InputBoxContainer>
            <input
                id={id}
                type="number"
                className="bg-white text-block text-[20px] sm:text-[22px] h-[40px] block w-full p-0 focus:outline-none min-w-[80px] p-4"
                placeholder="AMOUNT TO STAKE..."
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={(event) => {
                    if (isNaN(Number(event.target.value))) onChange(0)
                    else onChange(event.target.value)
                }
                }                
                required={true}                
            />
        </InputBoxContainer>
    )
}