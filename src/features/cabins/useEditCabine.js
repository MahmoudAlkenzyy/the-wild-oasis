import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../services/apiCabins';
import { toast } from 'react-hot-toast';

export function useEditCabine() {
    const queryClient = useQueryClient();

    const { mutate: editCabin, isediting: isEditing } = useMutation({
        mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['cabins'],
            });
            toast.success('Cabin successfully edited');
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });
    return { editCabin, isEditing };
}
