import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis } from "@/components/ui/pagination";

interface MetricsPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const MetricsPagination: React.FC<MetricsPaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="mt-4 cursor-default">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
              />
            </PaginationItem>

            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              
              // Always show first and last pages
              if (pageNumber === 1 || pageNumber === totalPages) {
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink 
                      onClick={() => onPageChange(pageNumber)} 
                      isActive={currentPage === pageNumber}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              }

              // Show pages around current page (current ±1)
              if (
                Math.abs(pageNumber - currentPage) <= 1 ||
                (pageNumber === 2 && currentPage <= 3) ||
                (pageNumber === totalPages - 1 && currentPage >= totalPages - 2)
              ) {
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink 
                      onClick={() => onPageChange(pageNumber)} 
                      isActive={currentPage === pageNumber}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              }

              // Show ellipsis if there's a gap
              if (
                pageNumber === 2 ||
                pageNumber === totalPages - 1
              ) {
                return (
                  <PaginationItem key={`ellipsis-${pageNumber}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }

              return null;
            })}

            <PaginationItem>
              <PaginationNext
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    );
};