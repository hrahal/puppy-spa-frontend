import Breadcrumbs from '@/app/ui/customers/breadcrumbs';
import CreateForm from '@/app/ui/customers/create-form';
 
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {

  const { date } = await (searchParams);
  console.log(date);


  const dates = date || new Date().toISOString().split('T')[0];

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Customers', href: '/dashboard/customers' },
          {
            label: 'Create Custumer Request',
            href: `/dashboard/customers/create`,
            active: true,
          },
        ]}
      />
      <CreateForm date={dates}/>
    </main>
  );
}