import Link from "next/link"
import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid"
import { Breadcrumb as bcType } from "@/types"

export default function Breadcrumb(props: { bcTree: bcType[] }): JSX.Element {
    return (
        <div className="text-gray-500 text-sm mb-3">
            {
                props.bcTree.map(bc => {
                    return bc.url === '' ? <div key={bc.url+bc.text} className="inline"><Link href={bc.url}>{bc.text}</Link></div> : <div className="inline" key={bc.url+bc.text}><a href={bc.url}>{bc.text}</a> <ChevronDoubleRightIcon className="h-3 w-3 inline" /> </div>
                })
            }
        </div>
    )
}