import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="flex items-center gap-2">
            <Button
                variant="outline"
                onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className="bg-white text-black border-gray-300 hover:bg-gray-100"
            >
                <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <div className="flex items-center bg-white border border-gray-300 rounded-md px-3 py-2">
                <span className="text-sm font-medium text-black">Page {currentPage} of {totalPages}</span>
            </div>
            <Button
                variant="outline"
                onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="bg-white text-black border-gray-300 hover:bg-gray-100"
            >
                Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
        </div>
    )
}

export default Pagination;