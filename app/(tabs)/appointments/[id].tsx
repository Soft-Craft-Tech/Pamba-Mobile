import CustomButton from "@/components/Button";
import StandardView from "@/components/StandardView";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image } from "expo-image";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import {
  useCancelAppointment,
  useGetASingleService,
  useGetSingleAppointment,
} from "@/api/use-appointments";
import { format } from "date-fns";
import SingleViewSkeleton from "@/components/Appointments/single-view-skeleton";
import { showNotification } from "@/hooks/toastNotication";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { CustomInput } from "@/components/CustomInput";

interface FormData {
  comment: string;
}

const SingleAppointment = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isPending } = useGetSingleAppointment(id);
  const queryClient = useQueryClient();

  const [isComment, setIsComment] = React.useState(false);

  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      comment: "",
    },
  });

  const { data: serviceData } = useGetASingleService(
    data?.appointment?.service_id
  );

  const date = new Date(data?.appointment?.date);

  const status = data?.appointment?.cancelled;

  const { mutate: cancelAppointment, isPending: isPendingsState } =
    useCancelAppointment(data.appointment.id, {
      onSuccess: (data) => {
        showNotification("Success", data?.message);
        queryClient.invalidateQueries({
          queryKey: ["/appointments/my-appointments"],
        });
        setIsComment(false);
        router.push("/");
      },
      onError: (error) => {
        if (axios.isAxiosError(error) && error?.response) {
          setIsComment(false);
          showNotification("Error", error?.response?.data?.message);
        } else {
          showNotification("Error", "An unexpected error occurred");
        }
      },
    });

  if (isPending) {
    return (
      <StandardView>
        <SingleViewSkeleton />
      </StandardView>
    );
  }
  const selectedSlot = {
    appointment_id: data.appointment.id,
  };

  const handleCancelAppointment = async (formData: FormData) => {
    if (data?.appointment?.id) {
      cancelAppointment({ ...selectedSlot, ...formData });
    } else {
      showNotification("Error", "Appointment ID not found");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StandardView>
        <Image
          source={{
            uri:
              serviceData?.service?.service_image === " "
                ? "https://plus.unsplash.com/premium_photo-1664537435460-35963d8e413e?q=80&w=3386&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                : serviceData?.service?.service_image,
          }}
          style={styles.salonImage}
        />
        <View style={styles.lowerContainer}>
          <Text style={styles.appointmentTitle}>
            {serviceData?.service?.business_name}
          </Text>
          <Text style={styles.contactText}>
            View Shop:
            <Text style={{ color: "#007B99" }}>
              {serviceData?.service?.directions.slice(0, 30)}
            </Text>
          </Text>
          <Text style={styles.serviceTitle}>
            {serviceData?.service?.service}
          </Text>
          <View style={styles.appointmentCard}>
            <View style={styles.dateSection}>
              <View style={styles.calendarCard}>
                <Text style={styles.calendarText}>{format(date, "d")}</Text>
                <Text style={styles.calendarText}>{format(date, "MMM")}</Text>
              </View>
              <View>
                <Text style={styles.cardTitle}>
                  {data?.appointment?.comment}
                </Text>
                <Text style={styles.attendantName}>With Jane</Text>
                <Text style={styles.dayText}>
                  {`${format(date, "eee")} ${data?.appointment?.time}`}
                </Text>
              </View>
            </View>
          </View>
          {isComment && (
            <Controller
              control={control}
              rules={{ required: "Add Comment Here" }}
              render={({ field: { onChange, value } }) => (
                <CustomInput
                  label="Add Comment Here"
                  text={value}
                  onChange={onChange}
                />
              )}
              name="comment"
            />
          )}
          {!status && !isComment && (
            <View style={styles.buttons}>
              <CustomButton
                onPress={() => {
                  setIsComment(true);
                }}
                buttonText="Cancel"
                width="46%"
                variant="outline"
              />
              <CustomButton
                onPress={() => {
                  router.push(`/reschedule/${data?.appointment?.id}`);
                }}
                buttonText="Reschedule"
                width="46%"
              />
            </View>
          )}

          {isComment && (
            <View style={{ marginTop: 10 }}>
              <CustomButton
                onPress={handleSubmit(handleCancelAppointment)}
                buttonText="Cancel"
                variant="outline"
                loading={isPendingsState}
              />
            </View>
          )}
        </View>
      </StandardView>
    </SafeAreaView>
  );
};

export default SingleAppointment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "#F6F6F9",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#3F3F3F",
    textTransform: "capitalize",
  },
  salonImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  lowerContainer: {
    marginTop: 20,
    gap: 5,
  },
  appointmentTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#DB1471",
  },
  contactBox: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  contactText: {
    fontSize: 12,
    fontWeight: "400",
  },
  locationLink: {
    fontSize: 12,
    fontWeight: "400",
    color: "#007B99",
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0F1C35",
  },
  appointmentCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },
  dateSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  calendarCard: {
    backgroundColor: "#DB1471",
    alignItems: "center",
    justifyContent: "center",
    height: 72,
    width: 72,
    borderRadius: 10,
  },
  calendarText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3F3F3F",
  },
  attendantName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#7A7A7A",
  },
  dayText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#001C33",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});
