import { LAMBDA_INSTANCES, RFID_URL } from "./axiosInstances";

export async function createRfid(data) {
  try {
    const response = await RFID_URL.post(`rfid/create`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}
export async function createManyRfid(data) {
  try {
    const response = await RFID_URL.post(`rfid/createMany`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}
export async function editRfid(Id, data) {
  try {
    const response = await RFID_URL.put(`rfid/${Id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteRfid(Id) {
  try {
    const response = await RFID_URL.delete(`rfid/${Id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getRfidById(Id) {
  try {
    const response = await RFID_URL.get(`rfid/${Id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getRfidBySNo() {
  try {
    // ? 111222333444 is id or  not?
    const response = await RFID_URL.get(
      `rfid/rfidbySerialNumber/111222333444`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getRfidList(filter={}) {
  try {
    const response = await RFID_URL.get(`rfid/list`,{params:filter});
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getRfidUnassignedList() {
  try {
    const response = await RFID_URL.get(`rfid/unassignedList`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
