import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { selectIsCollectionsFetched } from "../../features/shop/shopSelectors";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import CollectionPage from "./collection-page.component";

const mapStateToProps = createStructuredSelector({
  isLoaded: selectIsCollectionsFetched,
});

const CollectionPageContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionPage);

export default CollectionPageContainer;
