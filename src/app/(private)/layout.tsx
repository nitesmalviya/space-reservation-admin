
import PrivateLayout from '@/components/hoc/private-layout';
interface PrivateLayoutProps {
  readonly children: React.ReactNode;
}

const Layout: React.FC<PrivateLayoutProps> = async ({ children }) => {
  return (
    <div id="wrapper">
      {/* <Header /> */}
      <main>
        <PrivateLayout>
          {children}
        </PrivateLayout>
      </main>
      {/* <Footer /> */}
    </div>
  )
}

export default PrivateLayout;