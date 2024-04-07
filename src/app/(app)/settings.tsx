/* eslint-disable max-lines-per-function */
/* eslint-disable react/react-in-jsx-scope */
import { Env } from '@env';
import { useColorScheme } from 'nativewind';

import { Item } from '@/components/settings/item';
import { ItemsContainer } from '@/components/settings/items-container';
import { LanguageItem } from '@/components/settings/language-item';
import { ThemeItem } from '@/components/settings/theme-item';
import { useAuth } from '@/core';
import {
  Button,
  colors,
  FocusAwareStatusBar,
  Modal,
  ScrollView,
  Text,
  useModal,
  View,
} from '@/ui';
import { Github, Rate, Share, Support, Website } from '@/ui/icons';

export default function Settings() {
  const signOut = useAuth.use.signOut();
  const { colorScheme } = useColorScheme();
  const { dismiss, ref, present } = useModal();

  const iconColor =
    colorScheme === 'dark' ? colors.neutral[400] : colors.neutral[500];
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
                <Text className="text-xl">David Clinton</Text>
                <Text className="text-xl text-[#303535]">
                  clintondavid46@gmail.com
                </Text>
              </View>
            </View>
            <Button
              onPress={() => present()}
              variant="ghost"
              label="Edit Profile"
            />
            <Modal snapPoints={['60%']} title="Example Modal" ref={ref}>
              <View className="p-5">
                <Text>Modal Content</Text>
                <Button label="Close Modal" onPress={() => dismiss()} />
              </View>
            </Modal>
          </View>
          <ItemsContainer title="settings.generale">
            <LanguageItem />
            <ThemeItem />
          </ItemsContainer>

          <ItemsContainer title="settings.about">
            <Item text="settings.app_name" value={Env.NAME} />
            <Item text="settings.version" value={Env.VERSION} />
          </ItemsContainer>

          <ItemsContainer title="settings.support_us">
            <Item
              text="settings.share"
              icon={<Share color={iconColor} />}
              onPress={() => {}}
            />
            <Item
              text="settings.rate"
              icon={<Rate color={iconColor} />}
              onPress={() => {}}
            />
            <Item
              text="settings.support"
              icon={<Support color={iconColor} />}
              onPress={() => {}}
            />
          </ItemsContainer>

          <ItemsContainer title="settings.links">
            <Item text="settings.privacy" onPress={() => {}} />
            <Item text="settings.terms" onPress={() => {}} />
            <Item
              text="settings.github"
              icon={<Github color={iconColor} />}
              onPress={() => {}}
            />
            <Item
              text="settings.website"
              icon={<Website color={iconColor} />}
              onPress={() => {}}
            />
          </ItemsContainer>

          <View className="my-8">
            <ItemsContainer>
              <Item text="settings.logout" onPress={signOut} />
            </ItemsContainer>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
