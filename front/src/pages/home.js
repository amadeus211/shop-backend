import Card from '../components/Card';

export default function HomePage() {
  return (
    <div className="flex justify-center items-center min-h-screen space-x-4">
      <Card title="Клієнти" link="/clients" />
      <Card title="Акції" link="/promotions" />
      <Card title="Відгуки" link="/responses" />

    </div>
  );
}