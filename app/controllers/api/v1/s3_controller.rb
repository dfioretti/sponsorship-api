class Api::V1::S3Controller < ApplicationController
  def sign_upload
    objectName = params[:s3_object_name]
    mimeType = params['s3_object_type']
    expires = Time.now.to_i + 100
    s3_url = 'http://s3.amazonaws.com/'

    amzHeaders = "x-amz-acl:public-read"
    stringToSign = "PUT\n\n#{mimeType}\n#{expires}\n#{amzHeaders}\n/#{ENV['AWS_BUCKET_NAME']}/#{objectName}";
    sig = CGI::escape(Base64.strict_encode64(OpenSSL::HMAC.digest('sha1', ENV['AWS_SECRET_ACCESS_KEY'], stringToSign)))

    render json: {
      signed_request: CGI::escape("#{s3_url}#{ENV['AWS_BUCKET_NAME']}/#{objectName}?AWSAccessKeyId=#{ENV['AWS_ACCESS_KEY_ID']}&Expires=#{expires}&Signature=#{sig}"),
      url: "http://s3.amazonaws.com/#{ENV['AWS_BUCKET_NAME']}/#{objectName}"
    }
  end
end
