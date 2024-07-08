import { apiUrls } from '../../../../config/api';
import { fetchWrapper } from '../../../../utils/fetchWrapper';
import {
  DeliveryFormType,
  NewDispatchesResponse,
} from '../_types/DispatchTypes';

export const submitNewDispatches = async (
  dispatchDets: DeliveryFormType
): Promise<NewDispatchesResponse> => {
  return await fetchWrapper(apiUrls.SUBMIT_NEW_DISPATCH, {
    method: 'POST',
    body: JSON.stringify(dispatchDets),
  });
};
