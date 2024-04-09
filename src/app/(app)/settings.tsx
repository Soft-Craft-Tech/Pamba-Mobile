/* eslint-disable max-lines-per-function */
/* eslint-disable react/react-in-jsx-scope */

import { router } from 'expo-router';

import { Item } from '@/components/settings/item';
import { ItemsContainer } from '@/components/settings/items-container';
import { useAuth } from '@/core';
import { getUserData } from '@/core/auth/utils';
import {
  Button,
  FocusAwareStatusBar,
  Modal,
  ScrollView,
  Text,
  useModal,
  View,
} from '@/ui';
import NOtificationItem from '@/ui/icons/notiification-item';
import PaymentIcons from '@/ui/icons/payment-icon';
import SecurityIcon from '@/ui/icons/security-icon';
import TermsIcon from '@/ui/icons/terms';

export default function Settings() {
  const signOut = useAuth.use.signOut();
  const { dismiss, ref, present } = useModal();
  const userData = getUserData();

  return (
    <>
      <FocusAwareStatusBar />
      <ScrollView>
        <View className="flex-1 px-4 pt-16 ">
          <Text className="text-2xl font-bold text-[#000000]">Profile</Text>
          <View className="mt-5 flex flex-row justify-between">
            <View className="flex flex-row gap-x-4">
              <View className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-[#0F1C35] ">
                <Text className="text-xl text-[#DB1471]">TW</Text>
              </View>
              <View>
                <Text className="text-xl">{userData?.name}</Text>
                <Text className="text-xl text-[#303535]">
                  {userData?.email}
                </Text>
              </View>
            </View>
            <Button
              onPress={() => present()}
              variant="ghost"
              label="Edit Profile"
            />
            <Modal snapPoints={['60%']} title="Edit Profile" ref={ref}>
              <View className="p-5">
                <Button label="Submit" onPress={() => dismiss()} />
              </View>
            </Modal>
          </View>
          <ItemsContainer title="ACCOUNT">
            <Item
              icon={<NOtificationItem />}
              text="Notifications"
              onPress={() => {
                router.push('/feed/notifications');
              }}
            />
            <Item
              icon={<PaymentIcons />}
              text="Payment Method"
              onPress={() => {}}
            />
          </ItemsContainer>
          <ItemsContainer title="APPS">
            <Item
              icon={<SecurityIcon />}
              text="Privacy Policy"
              onPress={() => {}}
            />
            <Item
              icon={<TermsIcon />}
              text="Terms & Condiitions"
              onPress={() => {}}
            />
            <Item
              icon={<TermsIcon />}
              text="Logout"
              onPress={() => {
                signOut();
              }}
            />
          </ItemsContainer>
          <Button
            label="Deactivate Account"
            className="mt-5"
            onPress={() => {
              signOut();
            }}
          />
        </View>
      </ScrollView>
    </>
  );
}
