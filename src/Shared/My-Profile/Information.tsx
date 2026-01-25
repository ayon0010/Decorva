'use client'
import { Pen } from 'lucide-react';
import FirstForm from '../Form/FirstForm';
import SecondForm from '../Form/SecondForm';
import ThirdForm from '../Form/ThirdForm';

const Information = () => {


    return (
        <div className='flex flex-col gap-4'>
            <h2 className={`product-title mb-0!`}>User information</h2>
            <p>
                Here you can enter or edit public information about yourself. The data will be used in the future for ordering. The changes you make will be displayed immediately after saving.
            </p>
            <div className='flex flex-col gap-6'>
                <FirstForm />
                <SecondForm />
                <ThirdForm />
               
            </div>
        </div>
    )
}

export default Information;