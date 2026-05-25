import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteCustomer,
  loadCustomers,
  submitCustomerLead,
  updateCustomerStatus,
  type CustomerStatus,
  type NewCustomerInput,
} from "@/lib/site-customers";

export const customersQueryKey = ["site-customers"] as const;

export function useAdminCustomers() {
  return useQuery({
    queryKey: customersQueryKey,
    queryFn: loadCustomers,
  });
}

export function useCustomerMutations() {
  const queryClient = useQueryClient();
  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: customersQueryKey });
  };

  const submitLead = useMutation({
    mutationFn: (input: NewCustomerInput) => submitCustomerLead(input),
  });

  const setStatus = useMutation({
    mutationFn: ({ id, status }: { id: string; status: CustomerStatus }) =>
      updateCustomerStatus(id, status),
    onSuccess: invalidate,
  });

  const removeCustomer = useMutation({
    mutationFn: (id: string) => deleteCustomer(id),
    onSuccess: invalidate,
  });

  return { submitLead, setStatus, removeCustomer };
}
