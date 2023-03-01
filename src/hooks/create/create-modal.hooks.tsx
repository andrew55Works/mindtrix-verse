import React, { useState } from 'react';
import { useCreatorCreateI18n } from '../i18n/i18n.hooks';
import { FramerModalProps } from '../../components/common/modal/framer-modal';
import { useRouter } from 'next/router';
import { PAGE_URL } from '../../utils/page-router.utils';
import { I18N_NS_ENUM } from '../../utils/i18n-utils';
import { Trans } from 'next-i18next';
import { Text } from '../../styles/styled-system/text.theme';

export const useCreateActionModal = (essenceName: string) => {
  const [isIssueSuccess, setIsIssueSuccess] = useState(false);
  const [isDraftSuccess, setIsDraftSuccess] = useState(false);
  const [isShowIssueModal, setIsShowIssueModal] = useState(false);
  const [isShowDraftModal, setIsShowDraftModal] = useState(false);
  const { text } = useCreatorCreateI18n();
  const router = useRouter();

  const issueModalProps: FramerModalProps = {
    isEnableDismissModalFromClickingBackground: false,
    isShowModal: isShowIssueModal,
    onClick: {
      dismissModalFn: () => setIsShowIssueModal(false),
      leftButton: undefined,
      rightButton: () => {
        if (isIssueSuccess) {
          router.push(PAGE_URL.creators_home);
        } else {
          issueModalProps.onClick.dismissModalFn();
        }
      },
    },
    text: {
      description: isIssueSuccess ? (
        <Trans
          i18nKey={`${I18N_NS_ENUM.creator_create}:h4_modal_description_issue_success`}
          defaults={''}
          values={{ essenceName }}
          components={[
            <Text.h3 key='0' status={'basic'} children={essenceName} />,
          ]}
        />
      ) : (
        text.h4_modal_description_issue_fail
      ),
      leftButton: undefined,
      rightButton: isIssueSuccess
        ? text.button_modal_go_back_to_home
        : text.button_modal_redo,
      title: undefined,
    },
  };

  const draftModalProps: FramerModalProps = {
    isEnableDismissModalFromClickingBackground: false,
    isShowModal: isShowDraftModal,
    onClick: {
      dismissModalFn: () => setIsShowDraftModal(false),
      leftButton: undefined,
      rightButton: () => {
        if (isDraftSuccess) {
          router.push(PAGE_URL.creators_home);
        } else {
          issueModalProps.onClick.dismissModalFn();
        }
      },
    },
    text: {
      description: isDraftSuccess ? (
        <Trans
          i18nKey={`${I18N_NS_ENUM.creator_create}:h4_modal_description_draft_success`}
          defaults={''}
          values={{ essenceName }}
          components={[
            <Text.h3 key='0' status={'basic'} children={essenceName} />,
          ]}
        />
      ) : (
        text.h4_modal_description_draft_fail
      ),
      leftButton: undefined,
      rightButton: isDraftSuccess
        ? text.button_modal_go_back_to_home
        : text.button_modal_redo,
      title: undefined,
    },
  };

  return {
    value: {
      isIssueSuccess,
      isDraftSuccess,
      isShowIssueModal,
      isShowDraftModal,
    },
    setState: {
      setIsIssueSuccess,
      setIsDraftSuccess,
      setIsShowIssueModal,
      setIsShowDraftModal,
    },
    modalProps: {
      draft: draftModalProps,
      issue: issueModalProps,
    },
  };
};
