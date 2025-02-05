// TODO: import bluesky libs for posts / repos
// TODO: implement AES + base64

export function loadFile(postUri: string): Promise<Uint8Array> {
    return new Promise((resolve, reject) => {
        // TODO: implement
    });
}

// Should basically call the chunkToPosts function internally, after standing up a consumer model.
export function postFile(file: File): Promise<BskyPostResponseV1> {
    return new Promise((resolve, reject) => {
        // TODO: implement
    });
}

// fetches the first post to get the storage table
export function fileDiscovery(postUri: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
        // TODO: implement
    });
}

function hashCheck(post: any, hashValue: string): Boolean {
    return true; // TODO: implement
}

// TODO: import ATproto libs from bsky
type BskyPostResponseV1 = {
    uri: string;
    cid: string;
};

// All the below combined should chunk the data into 1kb "workable" smaller chunks, which will feed
// into a pipeline that can reschedule if the smaller chunks fail for any reason (too large when encrypted,
// too failed to post, etc.)
// Rescheduling should delete any posts that might have been created, so they should not be ignored as responses.
// Once all schedules have completed successfully, a table of locations must be generated, then passed
// through the same algorithm until the top-level (or last-rung) table can fit as a single chunk.

// Once complete, the table posts are created, from the bottom, up; the most chunks to the least.

// The end result should be a tree starting with a seed post cid (the file's URI); that post can be read
// to fetch the rest of the table chunks until the whole table is available. That table can then be used
// to reconstitute the file (assuming the correct keys are possessed) into the original file. If no posts
// have been deleted, this should result in a storage hit.

function chunkAndEncryptData(fileData: Uint8Array): Promise<Uint8Array[]> {
    return new Promise((resolve, reject) => {
        // TODO: implement
        // This should only chunk and encrypt the byte data it received into arrays that will fit (once normalized)
        // in a 280 character post (this leaves us 8 bytes for other info).
    });
}

function generateDiscoveryPost(fileData: Uint8Array): Promise<Uint8Array[]> {
    return new Promise((resolve, reject) => {
        // TODO: implement
        // This should call the chunkAndEncryptData function to generate the byte arrays for the file chunk table
        // and these are the last posts created after the data has already been posted and tracked by cid.
        // TODO: decision: reverse the array on return, or leave that to the consumer (moot if remaining private)
    });
}

// might not be desired, but essentially the single function that calls the rest when you pass in the pre-processed
// file data, and it should return the BlueSky post pointing to the initial file data table.
function chunkToPosts(fileData: Uint8Array): Promise<BskyPostResponseV1> {
    return new Promise((resolve, reject) => {
        // TODO: implement
    });
}

// The worker function - it gets a chunk, tries to encrypt into 280 characters; reject reason should include
// some information as to why, but generally, whatever series of chunks are being processed by the pipeline should
// automatically stop here, and the consumer should be holding onto any CIDs that worked, so they can be deleted from
// the network.
function createPostWithChunk(chunk: Uint8Array): Promise<BskyPostResponseV1> {
    return new Promise((resolve, reject) => {
        // TODO: implement
    });
}