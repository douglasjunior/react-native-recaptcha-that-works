/*
 * MIT License
 *
 * Copyright (c) 2020 Douglas Nassif Roma Junior
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

type PayloadClose = {
  close: [];
};

type PayloadError = {
  error: [any];
};

type PayloadLoad = {
  load: [];
};

type PayloadExpire = {
  expire: [];
};

type PayloadVerify = {
  verify: [string];
};

export type MessageReceivedPayload =
  | PayloadClose
  | PayloadError
  | PayloadLoad
  | PayloadExpire
  | PayloadVerify;

export const isPayloadClose = (
  payload: MessageReceivedPayload,
): payload is PayloadClose => {
  return 'close' in payload;
};

export const isPayloadError = (
  payload: MessageReceivedPayload,
): payload is PayloadError => {
  return 'error' in payload;
};

export const isPayloadLoad = (
  payload: MessageReceivedPayload,
): payload is PayloadLoad => {
  return 'load' in payload;
};

export const isPayloadExpire = (
  payload: MessageReceivedPayload,
): payload is PayloadExpire => {
  return 'expire' in payload;
};

export const isPayloadVerify = (
  payload: MessageReceivedPayload,
): payload is PayloadVerify => {
  return 'verify' in payload;
};
