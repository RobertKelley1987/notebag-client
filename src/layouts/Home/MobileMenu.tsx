import Modal from "../../components/Modal";
import Menu from "./Menu";

type MobileMenuProps = {
  handleDismiss: () => void;
};

function MobileMenu({ handleDismiss }: MobileMenuProps) {
  return (
    <Modal handleDismiss={handleDismiss}>
      <Menu />
    </Modal>
  );
}

export default MobileMenu;
