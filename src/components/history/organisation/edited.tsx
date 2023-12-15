import { OrganizationHistory } from '@/types';
import OrganizationHistoryWrapper from '@/wrappers/organisation_history';
import React from 'react';

interface Props {
  history: OrganizationHistory;
}

const Edited = ({ history }: Props) => {
  switch (history.historyType) {
    case 2:
      return (
        <OrganizationHistoryWrapper history={history}>
          <div className="w-fit text-center flex-center gap-4">Updated {history.event?.description}</div>
        </OrganizationHistoryWrapper>
      );
    case 8:
      return (
        <OrganizationHistoryWrapper history={history}>
          <div className="w-fit text-center flex-center gap-4">Updated {history.post?.content}</div>
        </OrganizationHistoryWrapper>
      );

    case 11:
      return (
        <OrganizationHistoryWrapper history={history}>
          <div className="w-fit text-center flex-center gap-4">Updated {history.post?.content}</div>
        </OrganizationHistoryWrapper>
      );

    case 14:
      return (
        <OrganizationHistoryWrapper history={history}>
          <div className="w-fit text-center flex-center gap-4">Updated Details {history.organizationID}</div>
        </OrganizationHistoryWrapper>
      );

    default:
      return <></>;
  }
};

export default Edited;