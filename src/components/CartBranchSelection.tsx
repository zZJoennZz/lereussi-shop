export default function CartBranchSelection({branches}: any) {
    function branchOnChange(e: any) {
        console.log(e)
    }
    return (
        <>
            <div className="mb-1 text-gray-500 font-bold italic text-sm">Selected Branch</div>
            <div className="mb-4">
                <select onChange={branchOnChange} className="textfield" name="branch" id="branch" value={localStorage.getItem('branch') || ''}>
                    {
                        branches && branches.map((branch: any) => <option value={branch.branch_id} key={branch.id}>{branch.branch_name}</option>)
                    }
                </select>
            </div>
        </>
    )
}