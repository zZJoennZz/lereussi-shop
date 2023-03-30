import type { GetServerSidePropsContext } from 'next';
import Router from 'next/router';
import { useEffect } from 'react';
import Meta from '@/components/Meta';
import styles from '@/styles/Order.module.css';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const getOrder = await fetch(`${process.env.API_URL}v1/shop/getorderguest/?order_id=${context.query.order}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));

  return {
    props: {
      order_details: getOrder || [],
    },
  };
}

export default function GetOrder({ order_details }: any): JSX.Element {
  if (order_details.length === 0) return <>INVALID ORDER</>;
  return (
    <>
      <Meta title={`Order # ${order_details[0].order_number}`} />

      <div className="container-outer min-h-screen">
        <div className="container-inner">
          <h1 className="mb-10 text-4xl font-bold text-gray-500">Order Status</h1>
          <div className="border relative border-pizza-500 p-3 text-gray-600 mb-3 rounded-lg">
            <div className="absolute -top-3 bg-white px-4 text-gray-600 font-bold">
              <span className="text-sm text-gray-600 font-bold">Order #:</span>{' '}
              <span className="bg-pizza-600 text-white text-xs p-1 rounded-lg">{order_details[0].order_number}</span>
            </div>
            <div className="mb-1 mt-2">
              <strong>Customer:</strong> <span>{order_details[0].customer.name}</span>
            </div>
            <div className="mb-1">
              <strong>Contact Number:</strong> <span>{order_details[0].customer.contact_number}</span>
            </div>
            <div className="mb-1">
              <strong>Email Address:</strong> <span>{order_details[0].customer.email_address}</span>
            </div>
          </div>
          {/* {console.log(order_details)} */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div>
              <ul
                className="relative m-0 w-full list-none overflow-hidden p-0 transition-[height] duration-200 ease-in-out"
                data-te-stepper-init
                data-te-stepper-type="vertical"
              >
                {order_details[0].histories.map((h: any, key: any) => {
                  return (
                    <li
                      key={h.id}
                      data-te-stepper-step-ref
                      className="relative h-fit after:absolute after:left-[2.45rem] after:top-[3.6rem] after:mt-px after:h-[calc(100%-2.45rem)] after:w-px after:bg-[#e0e0e0] after:content-[''] dark:after:bg-neutral-600"
                    >
                      <div
                        data-te-stepper-head-ref
                        className="flex cursor-pointer items-center p-6 leading-[1.3rem] no-underline after:bg-[#e0e0e0] after:content-[''] focus:outline-none"
                      >
                        <span
                          data-te-stepper-head-icon-ref
                          className="mr-3 flex h-[1.938rem] w-[1.938rem] items-center justify-center rounded-full bg-pizza-600 text-sm font-medium text-white"
                        >
                          {order_details[0].histories.length - key}
                        </span>
                        <span
                          data-te-stepper-head-text-ref
                          className="text-neutral-500 after:absolute after:flex after:text-[0.8rem] after:content-[data-content]"
                        ></span>
                        <div
                          className={`text-xs uppercase inline py-1 px-2 rounded-full ${
                            h.order_status === 'COMPLETED' && 'bg-green-800 text-white'
                          } ${(h.order_status === 'PENDING' || h.order_status === 'REFUNDED') && 'bg-gray-500 text-white'} ${
                            h.order_status === 'CANCELLED' && 'bg-red-600 text-white'
                          } ${
                            (h.order_status === 'AWAITING_DELIVERY' ||
                              h.order_status === 'AWAITING_PICKUP' ||
                              h.order_status === 'ON_DELIVERY' ||
                              h.order_status === 'ON_PICKUP') &&
                            'bg-blue-500 text-white'
                          }`}
                        >
                          {h.order_status === 'AWAITING_PICKUP' && 'AWAITING PICKUP'}
                          {h.order_status === 'ON_DELIVERY' && 'ON DELIVERY'}
                          {h.order_status === 'ON_PICKUP' && 'FOR PICKUP'}
                          {h.order_status === 'AWAITING_DELIVERY' && 'AWAITING DELIVERY'}
                          {h.order_status !== 'AWAITING_PICKUP' &&
                            h.order_status !== 'AWAITING_DELIVERY' &&
                            h.order_status !== 'ON_DELIVERY' &&
                            h.order_status !== 'ON_PICKUP' &&
                            h.order_status}
                        </div>
                      </div>
                      <div data-te-stepper-content-ref className="left-0 overflow-hidden pr-6 pb-3 pl-[3.75rem] duration-300 ease-in-out">
                        <div className="font-bold text-gray-600">{h.order_note}</div>
                        <div className="text-gray-500 text-sm italic">
                          {new Date(h.created || '').toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <div className="p-2 border border-slate-300 rounded-xl">
                <table className={`w-full ${styles.table}`}>
                  <thead className="text-xs lg:text-sm">
                    <tr className="uppercase text-gray-400 text-left">
                      <th>Product</th>
                      <th>SKU</th>
                      <th>QTY</th>
                      <th>Unit Price</th>
                      <th className="text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm lg:text-base">
                    {order_details[0].details.map((item: any) => {
                      return (
                        <tr className="border-b border-slate-300 text-gray-600" key={item.product_variant}>
                          <td>{item.variant_name}</td>
                          <td>{item.variant_sku}</td>
                          <td>{item.quantity}</td>
                          <td>₱ {item.amount}</td>
                          <td className="text-right">₱ {(item.amount * item.quantity).toFixed(2)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot className="text-gray-600">
                    <tr>
                      <th colSpan={4} className="text-end">
                        Subtotal
                      </th>
                      <td className="text-right">₱ {order_details[0].order_amount}</td>
                    </tr>
                    <tr>
                      <th colSpan={4} className="text-end">
                        Discount
                      </th>
                      <td className="text-right">(₱ {order_details[0].total_discount})</td>
                    </tr>
                    <tr>
                      <th colSpan={4} className="text-end">
                        Fees
                      </th>
                      <td className="text-right">₱ {order_details[0].total_fees}</td>
                    </tr>
                    <tr>
                      <th colSpan={4} className="text-end text-lg">
                        Grand Total
                      </th>
                      <td className="text-right text-lg font-bold">₱ {order_details[0].total_amount}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
          {/* {order_details[0].histories.map((h: any) => {
            return (
              <div key={h.id}>
                <div className="p-2 bg-gray-300 border rounded-lg mb-2 relative">
                  <div
                    className={`text-xs uppercase inline py-1 px-2 rounded-full ${h.order_status === 'COMPLETED' && 'bg-green-800 text-white'} ${
                      (h.order_status === 'PENDING' || h.order_status === 'REFUNDED') && 'bg-gray-500 text-white'
                    } ${h.order_status === 'CANCELLED' && 'bg-red-600 text-white'} ${
                      (h.order_status === 'AWAITING_DELIVERY' ||
                        h.order_status === 'AWAITING_PICKUP' ||
                        h.order_status === 'ON_DELIVERY' ||
                        h.order_status === 'ON_PICKUP') &&
                      'bg-blue-500 text-white'
                    }`}
                  >
                    {h.order_status === 'AWAITING_PICKUP' && 'AWAITING PICKUP'}
                    {h.order_status === 'ON_DELIVERY' && 'ON DELIVERY'}
                    {h.order_status === 'ON_PICKUP' && 'FOR PICKUP'}
                    {h.order_status === 'AWAITING_DELIVERY' && 'AWAITING DELIVERY'}
                    {h.order_status !== 'AWAITING_PICKUP' &&
                      h.order_status !== 'AWAITING_DELIVERY' &&
                      h.order_status !== 'ON_DELIVERY' &&
                      h.order_status !== 'ON_PICKUP' &&
                      h.order_status}
                  </div>
                  <div className="absolute right-2 top-1 text-sm text-gray-600 italic">
                    {new Date(h.created || '').toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                  <div className="mt-2 font-bold text-gray-600">{h.order_note}</div>
                </div>
              </div>
            );
          })} */}
        </div>
      </div>
    </>
  );
}
