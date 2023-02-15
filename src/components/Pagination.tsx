export default function Pagination({ items, pageSize, currentPage, onPageChange } : { items: number, pageSize: number, currentPage: number, onPageChange: any }) {
    const pagesCount = Math.ceil(items / pageSize)

    if (pagesCount === 1) return null
    const pages = Array.from({ length: pagesCount }, (_, i) => i + 1)

    return (
        <div>
            <ul>
                {pages.map(page => <li key={page}><a onClick={() => onPageChange(page)}>{page}</a></li>)}
            </ul>
        </div>
    )
}