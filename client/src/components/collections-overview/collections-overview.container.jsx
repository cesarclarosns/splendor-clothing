import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { selectIsCollectionsFetched } from "../../features/shop/shopSelectors";
import WithSpinner from "../with-spinner/with-spinner.component";
import CollectionsOverview from "../collections-overview/collections-overview.component";

const mapStateToProps = createStructuredSelector({
  isLoaded: selectIsCollectionsFetched,
});

const CollectionsOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;
