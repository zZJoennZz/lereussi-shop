import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { branchState } from '@/atoms'

export default function CartBranchSelection({branches}: any) {
    const [selectedBranch, setSelectedBranch] = useRecoilState(branchState)

    useEffect(() => {
        setSelectedBranch(localStorage.getItem('branch') || '')
    }, [])

    function branchOnChange(e: any) {
        setSelectedBranch(e.target.value)
        localStorage.setItem('branch', e.target.value);
    }
    return (
        <>
            <div className="mb-1 text-gray-500 font-bold italic text-sm">Selected Branch</div>
            <div className="mb-4">
                <select onChange={branchOnChange} className="textfield" name="branch" id="branch" value={selectedBranch}>
                    {
                        branches && branches.map((branch: any) => <option value={branch.branch_id} key={branch.id}>{branch.branch_name}</option>)
                    }
                </select>
            </div>
        </>
    )
}