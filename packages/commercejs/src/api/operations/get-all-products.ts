import type { OperationContext } from '@vercel/commerce/api/operations'
import type { GetAllProductsOperation } from '@vercel/commerce/types/product'
import type { CommercejsConfig, Provider } from '../index'

import { normalizeProduct } from '../../utils/normalize-product'

export default function getAllProductsOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getAllProducts<T extends GetAllProductsOperation>({
    config,
  }: {
    config?: Partial<CommercejsConfig>
  } = {}): Promise<T['data']> {
    const { sdkFetch } = commerce.getConfig(config)
    const { data } = await sdkFetch('products', 'list', {
      sortBy: 'sort_order',
    })

    const productsFormatted =
      data?.map((product: any) => normalizeProduct(product)) || []

    return {
      products: productsFormatted,
    }
  }

  return getAllProducts
}
