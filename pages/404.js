import {useEffect} from 'react'
import { useRouter } from "next/router";
import Image from 'next/image';

export default function ErrorPage() {
    const router = useRouter();
    
    useEffect(() => {
        setTimeout(() => {
        router.push("/");
        }, 2000);
    }, []);

    return (
    <div>
        <Image src="/images/not_found.gif" alt="Not Found" layout="fill"/>
    </div>
    )
}
