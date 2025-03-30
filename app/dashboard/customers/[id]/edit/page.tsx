import Breadcrumbs from '@/app/ui/customers/breadcrumbs';
import { getCustomerById, getCustomers } from '@/app/lib/customer-data';
import { notFound } from 'next/navigation';
import EditForm from '@/app/ui/customers/edit-form';

 
export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;  
    const id = params.id;

    const customerRequest = await getCustomerById(Number(id));
      

    if (!customerRequest.length) {
        notFound();
    }
    
    const customer = customerRequest[0];
    
    return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Customers', href: '/dashboard/customers' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/customers/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditForm customerRequest={customer} />
    </main>
  );
}