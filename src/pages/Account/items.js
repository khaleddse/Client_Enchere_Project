import { SimpleGrid } from "@chakra-ui/react";
import Card from "../../components/card";
import { connect } from "react-redux";

const Items = ({ usr, userAnnounce }) => {
  return (
    <SimpleGrid minChildWidth="300px" spacing="10px">
      {userAnnounce &&
        userAnnounce.map((item) => <Card item={item} key={item._id} />)}
    </SimpleGrid>
  );
};

const mapStateToProps = (state) => {
  return {
    usr: state.users.user,
    userAnnounce: state.annoncement.userAnnounces,
  };
};

export default connect(mapStateToProps)(Items);
